import { useEffect, useRef } from "react";
import { useInfiniteProducts } from "../hooks/useInfiniteProducts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const ProductsPage = () => {
  const { products, loading, error, hasNext, loadMore } =
    useInfiniteProducts();
  const hasLoadedInitialPage = useRef(false);

  const lastElementRef = useInfiniteScroll(() => {
    if (!loading && hasNext && !error) {
      void loadMore();
    }
  });

  useEffect(() => {
    if (hasLoadedInitialPage.current) {
      return;
    }

    hasLoadedInitialPage.current = true;
    void loadMore();
  }, [loadMore]);

  return (
    <div>
      <ul>
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <li ref={lastElementRef} key={product.product_id}>
                {product.title}
              </li>
            );
          }

          return <li key={product.product_id}>{product.title}</li>;
        })}
      </ul>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && products.length === 0 && <p>No products found.</p>}
      {!loading && !error && !hasNext && products.length > 0 && <p>No more products</p>}
    </div>
  );
};

export default ProductsPage;
