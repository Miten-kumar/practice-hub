import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import type { Product } from "./types/product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3001/products?limit=10",
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setProducts(payload.data);
      } catch (fetchError) {
        if ((fetchError as Error).name !== "AbortError") {
          setError("Unable to load products.");
        }
      } finally {
        setLoading(false);
      }
    }, 0);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );

  if (loading) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  }

  return (
    <div className="page">
      <h1>Slow Product Store</h1>

      <input
        type="search"
        placeholder="Search products"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {error ? <p>{error}</p> : null}

      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;
