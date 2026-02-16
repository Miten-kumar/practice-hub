import { useEffect, useRef } from 'react';

export const usePerformanceMonitor = (componentName: string) => {
  
  const renderCount = useRef(0);
  const startTime = useRef<number|null>(null);

  renderCount.current += 1;
  startTime.current = performance.now(); 
  
  useEffect(() => {
    const endTime = performance.now();
    const duration = endTime - startTime.current;

    console.log(`[${componentName}] Render #${renderCount.current} took ${duration.toFixed(2)}ms`);

    if (duration > 16) { 
       console.warn(` [${componentName}] BOTTLENECK DETECTED! Render is too slow.`);
    }
  }); 
};

export default usePerformanceMonitor;