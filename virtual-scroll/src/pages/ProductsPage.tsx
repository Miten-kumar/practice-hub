import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../app/slices/productSlice";
import VirtualProductList from "../components/VirtualProductList";
import type { Product } from "../app/slices/types";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const { data: prodData } = useGetProductsQuery(1);

  useEffect(() => {
    const loadProducts = async () => {
      if (prodData) setProducts(prodData);
    };

    loadProducts();
  }, [prodData]);
  console.log(products.length)

  return (
    <div>
      <h1>Products</h1>

      {products.length > 0 ? (
        <VirtualProductList products={products} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductsPage;
