import { makeTracker } from './auto';
import { type EventArgs, type Events } from './events';

/**
 * Telemetry fully disabled — all tracking is a no-op.
 */
const noopTracker = {
  init() {},
  track() {},
  track_pageview() {},
  opt_out_tracking() {},
  opt_in_tracking() {},
  identify() {},
  reset() {},
  people: { set() {} },
};

const noopSentry = {
  init() {},
  enable() {},
  disable() {},
};

// track proxy still works but calls are no-ops
export const track = makeTracker(() => {});
export const tracker = noopTracker;
export const sentry = noopSentry;
export const enableAutoTrack = () => () => {};
export const flushTelemetry = () => Promise.resolve();
export const setTelemetryContext = () => {};
export const setTelemetryTransport = () => {};
export type { EventArgs, Events };
export default track;
