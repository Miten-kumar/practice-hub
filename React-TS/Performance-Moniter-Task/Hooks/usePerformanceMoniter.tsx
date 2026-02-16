import { useEffect, useRef } from 'react';

export const usePerformanceMonitor = (componentName: string) => {
  
  const renderCount = useRef(0);
  const startTime = useRef<number|null>(null);

  renderCount.current += 1;
  startTime.current = performance.now(); 
  
  useEffect(() => {

    if (startTime.current === null) 
      return;

    const endTime = performance.now();
    const duration = endTime - startTime.current;

    console.log(`Render #${renderCount.current} took ${duration.toFixed(2)}ms`);

    if (duration > 16) { 
       console.warn(`! Render is too slow.`);
    }
  }); 
};

export default usePerformanceMonitor;