import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import type { Product } from "./types/product";

type ProductApiItem = {
  id: number;
  title: string;
  image: string | null;
  price: number | string;
  description: string | null;
};

type ProductsApiResponse = {
  data: ProductApiItem[];
};

function normalizeProduct(product: ProductApiItem): Product {
  return {
    id: product.id,
    title: product.title,
    image:
      product.image || `https://picsum.photos/1200/900?random=${product.id}`,
    price: Number(product.price),
    description: product.description || "No description available.",
  };
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/products?limit=50",
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = (await response.json()) as ProductsApiResponse;
        setProducts(payload.data.map(normalizeProduct));
      } catch (fetchError) {
        if ((fetchError as Error).name !== "AbortError") {
          setError("Unable to load products.");
        }
      }
    }, 2000);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, []);

  for (let i = 0; i < 5000000; i += 1) {
    Math.sqrt(i);
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );

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
