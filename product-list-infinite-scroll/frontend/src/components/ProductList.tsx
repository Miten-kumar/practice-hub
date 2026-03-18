import { useCallback, useEffect, useRef, useState } from "react";
import Product from "./Product";
import axios from "axios";

interface ProductApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<ProductApiResponse[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:3001/products?cursor=${cursor ?? ""}&limit=10`,
      );
      const data = await res.data;

      setProducts((prev) => [...prev, ...data.data]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, hasMore]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            fetchProducts();
          }
        },
        {
          threshold: 1.0, // trigger when fully visible
        },
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, fetchProducts],
  );

  if (error) {
    return (
      <>
        <h1>Fallback UI</h1>
      </>
    );
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 24,
      }}
    >
      {products.map((product, index) => {
        if (index === products.length - 1) {
          return (
            <div ref={lastElementRef} key={product.id}>
              <Product {...product} />
            </div>
          );
        }

        return <Product key={product.id} {...product} />;
      })}

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more products</p>}
    </div>
  );
}
