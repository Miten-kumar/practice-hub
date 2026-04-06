# Performance Optimization Challenge App

This app is intentionally slow so you can practice a realistic optimization workflow on a React + Vite project.

## What makes it slow

- Main-thread blocking work runs during render.
- Product filtering and sorting are recalculated on every render.
- Each card does extra CPU work before painting.
- Hundreds of cards render at once with no virtualization.
- Large remote images load eagerly with no `loading="lazy"` or dimensions.
- A promo banner appears after initial paint, creating layout shift.
- Scroll and timer state cause unnecessary rerenders.

## Suggested challenge flow

1. Capture a baseline with Lighthouse and Chrome DevTools.
2. Fix Core Web Vitals issues: LCP, CLS, INP/TBT pressure.
3. Introduce code/data loading strategies and render optimizations.
4. Add performance budgets in the build pipeline.
5. Add RUM instrumentation for field metrics.
6. Document before/after metrics and the changes that produced them.

## Baseline metrics template

Fill this in after you audit the app locally.

| Metric | Before | After | Notes |
| --- | --- | --- | --- |
| Lighthouse Performance | TBD | TBD |  |
| LCP | TBD | TBD |  |
| CLS | TBD | TBD |  |
| INP / TBT | TBD | TBD |  |
| JS bundle size | TBD | TBD |  |
| Image payload | TBD | TBD |  |

## Run the app

```bash
npm install
npm run dev
```

For a production-style Lighthouse run:

```bash
npm run build
npm run preview
```

## Performance budgets

Bundle budgets are enforced with:

```bash
npm run build:perf
```

Current limits:

- JavaScript gzip: 170 KB
- CSS gzip: 10 KB

Lighthouse assertions are configured in `lighthouserc.json`:

- Performance score: at least 90
- LCP: at most 2500 ms
- CLS: at most 0.1
- TBT: at most 200 ms

Run Lighthouse CI with:

```bash
npm run lhci
```
