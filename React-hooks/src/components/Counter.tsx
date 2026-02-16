import { useEffect, useState } from "react";
import usePerformanceMonitor from "../hooks/usePerformanceMonitor";
export default function Counter() {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    let c = 0;
    for (let i = 0; i < 1e9; i++) {
      // Simulate heavy computation
      c = c + 1;
    }
  }, [counter]);

  usePerformanceMonitor("Counter", {
    slowRenderThreshold: 10,
    logOnEveryRender: true,
  });
  return (
    <div>
      Counter: {counter}
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
}
