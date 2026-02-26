import { useState } from "react";
import Counter from "./components/Counter";
import AddUserForm from "./components/AddUserForm";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <h1>Hello, React with TypeScript!</h1>
      <div>
        <Counter count={count} />
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      <AddUserForm />
    </>
  );
}

export default App;
