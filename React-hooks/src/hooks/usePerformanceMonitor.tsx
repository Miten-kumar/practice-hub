import { useEffect, useRef } from "react";

type PerformanceOptions = {
  slowRenderThreshold?: number;
  logOnEveryRender?: boolean;
  enabled?: boolean;
};

export default function usePerformanceMonitor(
  componentName: string,
  {
    slowRenderThreshold = 16,
    logOnEveryRender = false,
    enabled = true,
  }: PerformanceOptions = {},
) {
  const renderCountRef = useRef(0);
  const renderStartRef = useRef<number>(0);

  // Mark render start (runs during render)
  renderStartRef.current = performance.now();
  renderCountRef.current += 1;

  useEffect(() => {
    if (!enabled) return;
    const renderEnd = performance.now();
    const renderDuration = renderEnd - renderStartRef.current;
    const renderCount = renderCountRef.current;

    const isSlow = renderDuration > slowRenderThreshold;

    if (isSlow || logOnEveryRender) {
      const logMethod = isSlow ? console.warn : console.log;

      logMethod(`[Performance] ${componentName}`, {
        renderCount,
        renderDuration: `${renderDuration.toFixed(2)}ms`,
        slow: isSlow,
      });
    }
  });
}
