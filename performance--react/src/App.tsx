import { useState, Profiler } from "react";
import ExampleComponent from "./components/ExampleComponent";

function App() {
  const handleRender = (
    id: string, // the "id" prop of the Profiler tree
    phase: string, // "mount" (first render) or "update" (re-render)
    actualDuration: number, // time spent rendering the commit
    baseDuration: number, // estimated time for a full re-render
    startTime: number, // when React started rendering
    commitTime: number, // when React committed the update
  ) => {
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    },'bhbhbhbhbhbhbh',`duration of render for ${id} during ${phase}: ${actualDuration}ms
    difference from base duration: ${(actualDuration - baseDuration).toFixed(2)}ms
    difference in start time and commit time: ${(commitTime - startTime).toFixed(2)}ms
    `);
  };
  const [count, setCount] = useState(0);


  return (
    <>
      <h1>Vite + React</h1>
      <div>
        <Profiler id="ExampleComponent" onRender={handleRender}>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </Profiler>
      </div>
      <ExampleComponent />
    </>
  );
}

export default App;
