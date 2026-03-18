import { useEffect, useRef, useState, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import "./styles.css";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  created_at: number;
};

let requestId = 0;

function Skeleton() {
  return <div className="skeleton" />;
}

export default function App() {
  const parentRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const [data, setData] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [announcement, setAnnouncement] = useState("");

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const id = ++requestId;

    try {
      const res = await fetch(
        `http://localhost:4000/products?cursor=${cursor ?? ""}`,
        { signal: controller.signal }
      );

      const json = await res.json();

      if (id !== requestId) return;

      setData((prev) => {
        const map = new Map();
        [...prev, ...json.data].forEach((item: Product) =>
          map.set(item.id, item)
        );
        return [...map.values()];
      });

      setCursor(json.nextCursor);
      setHasMore(!!json.nextCursor);
      setAnnouncement(`${json.data.length} new items loaded`);
    } catch (e) {
      if ((e as unknown as Error).name !== "AbortError") {
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, hasMore]);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90,
    overscan: 5,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      },
      { rootMargin: "200px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [fetchData]);

  useEffect(() => {
    const saved = sessionStorage.getItem("scrollY");
    if (saved && parentRef.current) {
      parentRef.current.scrollTop = Number(saved);
    }
  }, []);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const save = () => {
      sessionStorage.setItem("scrollY", String(el.scrollTop));
    };

    el.addEventListener("scroll", save);
    return () => el.removeEventListener("scroll", save);
  }, []);

  return (
    <div className="app">
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <div ref={parentRef} className="feed-container" role="feed">
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const item = data[virtualRow.index];
            if (!item) return null;

            return (
              <div
                key={item.id}
                className="card"
                role="article"
                tabIndex={0}
                ref={rowVirtualizer.measureElement}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  position: "absolute",
                  width: "100%",
                }}
              >
                <div className="name">{item.name}</div>
                <div className="meta">{item.category}</div>
                <div className="price">₹{item.price}</div>
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div ref={loaderRef} className="loader">
            {loading ? <Skeleton /> : "Scroll to load more"}
          </div>
        )}

        {!hasMore && <div className="end">No more items</div>}
      </div>

      <div className="controls">
        <button onClick={fetchData}>Load More</button>
        <button onClick={() => parentRef.current?.scrollTo(0, 0)}>
          Back to top
        </button>
      </div>
    </div>
  );
}