import { useState , useCallback} from 'react'
import Child from './components/Child';
import './App.css'

function App() {
  const [count, setCount] = useState<number>(0);

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <Child increment={increment} />
    </div>
  );
}

export default App
