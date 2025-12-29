/**
 * Dev-only web-vitals logging.
 * Keeps production bundles clean by being dynamically imported from `main.jsx` in DEV only.
 */
export async function initWebVitals() {
  // Guard: only run in browsers
  if (typeof window === 'undefined') return;

  try {
    const { onCLS, onINP, onLCP } = await import('web-vitals');
    const log = (metric) => {
      // Metric docs: https://github.com/GoogleChrome/web-vitals
      // Keep logs compact but useful for triage.
      const { name, value, rating, delta, id } = metric;
      // eslint-disable-next-line no-console
      console.info(`[web-vitals] ${name}`, { value, rating, delta, id });
    };

    onCLS(log);
    onINP(log);
    onLCP(log);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[web-vitals] failed to init', err);
  }
}


