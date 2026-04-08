import { useEffect, useState, useMemo } from "react";

// function blockMainThread(ms: number) {
//   const start = performance.now();
//   while (performance.now() - start < ms) {continue}
// }

export default function App() {
  const [items, setItems] = useState<number[]>([]);
  // const [showBanner, setShowBanner] = useState(false);
  // ❌ Simulate heavy rendering 
  // fixed
  const arr = useMemo(() => Array.from({ length: 200 }, (_, i) => i), []);
  useEffect(() => {
    setItems(arr);
  }, [arr]);

  return (
    <div>
      <h1>🚨 Worst React App</h1>

      {/* ❌ LCP DESTROYED */}
      {/* fixed */}
      <img
        src="https://picsum.photos/id/1018/3000/2000"
        loading="eager"
        alt="hero"
        width="3000"
        height="2000"
      />

      {/* ❌ CLS: appears late */}
      {/* fixed */}
      {/* {showBanner && ( */}
      <div style={{ background: "red", color: "white" }}>
        🔥 Breaking News Banner
      </div>
      {/* )} */}

      {/* ❌ MASSIVE DOM + images */}
      {/* fixed */}
      {items.map((i) => (
        <div key={i}>
          <img
            key={i}
            src={`https://picsum.photos/id/${i}/400/300`}
            width="300"
            height="400"
            loading="lazy"
            alt={`${i}`}
          />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. {i}</p>
        </div>
      ))}

      {/* ❌ INP destroyed */}
      {/* fixed */}
      <button
        onClick={() => {
          // blockMainThread(1000); // 1s freeze
          alert("Done!");
        }}
      >
        Click Me (Laggy)
      </button>
    </div>
  );
}
