import { useRef, useEffect } from "react";

/**
 * A custom hook to monitor component performance, including render count and duration.
 * @param {string} componentName The name of the component for logging purposes.
 */
const usePerformanceMonitor = (componentName: string) => {
  const renderCount = useRef(0);
  const startTimeRef = useRef<number >(performance.now());
  const renderObj = useRef<{ [key: number]: string }>({});
 
  useEffect(() => {
    // This effect runs after every render.
    renderCount.current += 1;
    const endTime = performance.now();
    const duration = endTime - startTimeRef.current;
    const actualDuration = duration.toFixed(2);
    const renderNumber = renderCount.current;
    renderObj.current[renderNumber] = actualDuration;
    
    console.log(renderObj, "kmkmkmk");
    
    console.log(
        `%c[Perf Monitor] ${componentName}`,
        "color: cyan; font-weight: bold;",
        {
            renders: renderNumber,
            actualDuration: `${actualDuration}ms`,
            timestamp: new Date().toLocaleTimeString(),
        },
    );
    
    startTimeRef.current = performance.now();
});
};

export default usePerformanceMonitor;
