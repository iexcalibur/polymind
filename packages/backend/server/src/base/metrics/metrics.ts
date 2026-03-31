interface Counter {
  add(value: number, attrs?: Record<string, any>): void;
}

interface Histogram {
  record(value: number, attrs?: Record<string, any>): void;
}

interface Gauge {
  record(value: number, attrs?: Record<string, any>): void;
}

interface MetricNamespace {
  counter(name: string): Counter;
  histogram(name: string): Histogram;
  gauge(name: string): Gauge;
}

function createNamespace(): MetricNamespace {
  const counters = new Map<string, Counter>();
  const histograms = new Map<string, Histogram>();
  const gauges = new Map<string, Gauge>();

  return {
    counter(name: string): Counter {
      let c = counters.get(name);
      if (!c) {
        c = { add() {} };
        counters.set(name, c);
      }
      return c;
    },
    histogram(name: string): Histogram {
      let h = histograms.get(name);
      if (!h) {
        h = { record() {} };
        histograms.set(name, h);
      }
      return h;
    },
    gauge(name: string): Gauge {
      let g = gauges.get(name);
      if (!g) {
        g = { record() {} };
        gauges.set(name, g);
      }
      return g;
    },
  };
}

function createMetricsProxy(): Record<string, MetricNamespace> {
  const namespaces = new Map<string, MetricNamespace>();

  return new Proxy({} as Record<string, MetricNamespace>, {
    get(_target, prop: string) {
      let ns = namespaces.get(prop);
      if (!ns) {
        ns = createNamespace();
        namespaces.set(prop, ns);
      }
      return ns;
    },
  });
}

export const metrics = createMetricsProxy();

/**
 * Method decorator that records call duration and count metrics.
 */
export function CallMetric(
  namespace: string,
  name?: string,
  attrs?: Record<string, any>
): MethodDecorator {
  return (_target, propertyKey, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    if (typeof original !== 'function') {
      return descriptor;
    }

    const metricName = name ?? String(propertyKey);

    descriptor.value = async function (this: any, ...args: any[]) {
      const ns = metrics[namespace];
      ns.counter('function_calls').add(1, { name: metricName, ...attrs });
      const start = Date.now();
      try {
        return await original.apply(this, args);
      } finally {
        ns.histogram('function_timer').record(Date.now() - start, {
          name: metricName,
          ...attrs,
        });
      }
    };

    return descriptor;
  };
}

/**
 * Wraps a function with call count and duration metrics.
 */
export function wrapCallMetric<T extends (...args: any[]) => any>(
  fn: T,
  namespace: string,
  name: string,
  attrs?: Record<string, any>
): T {
  const ns = metrics[namespace];

  const wrapped = async function (this: any, ...args: any[]) {
    ns.counter('function_calls').add(1, { name, ...attrs });
    const start = Date.now();
    try {
      return await fn.apply(this, args);
    } finally {
      ns.histogram('function_timer').record(Date.now() - start, {
        name,
        ...attrs,
      });
    }
  };

  return wrapped as unknown as T;
}
