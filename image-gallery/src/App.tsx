import { useEffect } from "react";
import { Gallery } from "./components/Gallery";
import "./App.css"

export default function App() {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          console.log("CLS:", entry.value);
        }
      }
    });

    observer.observe({ type: "layout-shift", buffered: true });

    return () => observer.disconnect();
  }, []);
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
     <Gallery/>
    </div>
  );
}
