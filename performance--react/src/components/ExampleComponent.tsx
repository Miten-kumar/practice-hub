import { useState } from 'react';
// import usePerformanceMonitor from '../hooks/usePerformanceMonitor'; // Adjust the path as necessary

function ExampleComponent() {
  const [count, setCount] = useState(0);

  // Monitor performance of this component
  // usePerformanceMonitor('ExampleComponent');

  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment Count (triggers re-render)
      </button>
      <p>Open the console to view performance metrics.</p>
    </div>
  );
}

export default ExampleComponent;
