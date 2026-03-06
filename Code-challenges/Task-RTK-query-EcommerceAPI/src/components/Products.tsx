import { useGetProductsQuery } from "../Redux/features/productSlice";
import { useAddToCartMutation } from "../Redux/features/cartSlice";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery({ offset : 1 ,limit: 10 });
  const [addToCart] = useAddToCartMutation();

  if (isLoading) return <p>Loading products...</p>;

  return (
    <div>
      <h2>Products</h2>

      {data?.map((product) => (
        <div key={product.id} style={{ marginBottom: "10px" }}>
          <p>{product.title}</p>
          <p>${product.price}</p>

          <button
            onClick={() =>
              addToCart({
                ...product,
                quantity: 1,
              })
            }
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;