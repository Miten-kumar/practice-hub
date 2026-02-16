import { useRef } from 'react';

const App = () => {
  
  const input = useRef<HTMLInputElement>(null);

  const handleFocusClick = () => {  
    input.current?.focus(); 
  };

  return (
    <div>
      <input ref={input} type="text" placeholder="Type here..." />
      
      <button onClick={handleFocusClick}>
        Force Keyboard to Open
      </button>
    </div>
  );
};

export default App;