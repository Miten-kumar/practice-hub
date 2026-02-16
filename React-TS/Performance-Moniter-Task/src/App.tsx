import { useState } from 'react';
import  usePerformanceMonitor  from '../Hooks/usePerformanceMoniter'; 
import './App.css'

function App() {
 
  usePerformanceMonitor('App');

  const [text, setText] = useState('');

  return (
    <>
      <h2>Type to force re-renders</h2>
      <input 
        type="text"
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type here..."
      />
    </>
  );
}

export default App;