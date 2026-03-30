/**
 * Telemetry removed — readwise tracking is a no-op.
 */
export const readwiseTrack = new Proxy(
  {},
  {
    get() {
      return () => {};
    },
  }
);
