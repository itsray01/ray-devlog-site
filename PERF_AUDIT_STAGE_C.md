# Stage C — Route-level splitting + lazy loading

This stage focuses on making navigation “instant-feeling” by:
- Keeping layout visible during lazy route loads (per-route `Suspense`)
- Lazy-loading heavy features (Starfield + charts) so they don’t inflate route entry chunks
- Prefetching common routes on idle after first paint

## Bundle snapshot (analyze build)

Generated via:
- `node ./node_modules/vite/bin/vite.js build --mode analyze`

Notable chunk changes (minified, from build output):
- **Home route**: `Home-*.js` is now **~23 kB** (Starfield split out)
- **Starfield effect**: `StarfieldBackground-*.js` is now **~155 kB**
- **MyJourney route entry**: `MyJourney-*.js` is now **~30 kB**
  - Charts split out into:
    - `StatisticsDashboard-*.js` **~193 kB**
    - `CostCharts-*.js` **~369 kB**

## UX impact

- Route transitions keep nav/layout on-screen and avoid “full app” loading states.
- Heavy visuals/data viz load only when needed (and after initial paint).


