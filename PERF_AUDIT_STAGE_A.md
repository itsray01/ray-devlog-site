# Stage A — Baseline + Audit (no behavior changes)

This stage adds:
- Bundle analysis (`rollup-plugin-visualizer`) via `npm run analyze`
- Dev-only perf metric logs (`web-vitals`) for quick LCP/CLS/INP checks in the console

## Bundle size snapshot (analyze build)

Generated via:
- `node ./node_modules/vite/bin/vite.js build --mode analyze`
- Output dir: `dist-analyze/`
- Visual report: `dist-analyze/bundle-report.html`

Largest JS chunks (minified, from build output):
- `MyJourney-*.js`: **~597 kB** (gzip ~187 kB)
- `index-*.js`: **~350 kB** (gzip ~115 kB)
- `Home-*.js`: **~178 kB** (gzip ~52 kB)

Largest CSS:
- `index-*.css`: **~114 kB** (gzip ~19 kB)

## Likely “heavy” sources (by code inspection)

- **`MyJourney` page**
  - Imports charts/dashboards and a large `journeyLogs` dataset, plus UI for filtering and rendering many cards.
  - Likely pulls in heavyweight deps: **Chart.js**, **Recharts**, and related render logic.
- **Home visuals**
  - `StarfieldBackground` uses **tsParticles** (good candidate for strict page-only + defensive init).
- **WebGL**
  - `TransitionWebGL.jsx` exists and uses **Three.js** patterns (even if not always loaded); must be lazy + fail-safe.

## Initial optimization targets (next stages)

- **Route chunking**
  - Keep heavy dependencies (charts, tsParticles, WebGL) out of the shared `index` chunk where possible.
- **“BG only” stability**
  - Add route/layout-level ErrorBoundary so background effects can’t blank the whole app.
- **Main-thread health**
  - Ensure effects stop when not visible and respect reduced motion.


