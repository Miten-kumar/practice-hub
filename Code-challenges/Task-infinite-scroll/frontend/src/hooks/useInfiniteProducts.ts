import { useCallback, useState } from "react";
import axios from "axios";

export interface Product {
  product_id: number;
  name: string;
  title: string;
  price: number;
  description: string;
}

export function useInfiniteProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(true);

  const fetchProducts = async (cursor: number | null) => {
    const res = await axios.get("/api/products", {
      params: {
        cursor,
        limit: 10,
      },
    });

    return res.data as {
      data?: Product[];
      nextCursor?: number | null;
      hasNext?: boolean;
    };
  };

  const loadMore = useCallback(async () => {
    if (loading || !hasNext) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetchProducts(cursor);
      const nextProducts = Array.isArray(res.data) ? res.data : [];

      setProducts((prev) => [...prev, ...nextProducts]);
      setCursor(res.nextCursor ?? null);
      setHasNext(res.hasNext ?? false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load products");
      }
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, hasNext]);

  return {
    products,
    loading,
    error,
    hasNext,
    loadMore,
  };
}
