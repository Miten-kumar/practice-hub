import React, { useEffect, useState } from 'react';
import { ImageGallery } from './components/ImageGallery';
import { LargeList } from './components/LargeList';

const App: React.FC = () => {
  const [data, setData] = useState<number | null>(null);

    useEffect(() => {
    const worker  = new Worker(new URL('./worker.ts',import.meta.url))

    worker.postMessage('start')

    worker.onmessage = (e:MessageEvent) => {
      setData(e.data)
    }
  }, []);

  return (
    <div>
      <h1>🚨 Slow Performance App</h1>

      <p>Computation: {data}</p>

      <img src="./peacock-feather-wallpaper-hd-wallpaper-photo.jpeg" height={1000} width={1200} fetchPriority='high' alt="image"/>

      <ImageGallery />

      <LargeList />

    <button>click me : </button> 
    </div>
  );
};

export default App;



