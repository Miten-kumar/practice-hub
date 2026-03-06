import {
  useAddToCartMutation,
  useGetCartByUserQuery,
} from "../services/cartApi";

export default function Cart() {
  const userId = 1;
  const { data = [], isLoading, error } = useGetCartByUserQuery(userId);
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  return (
    <div>
      <h2>Cart</h2>

      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to load cart</p>}

      {data.map((item) => (
        <div key={item.productId}>
          Product #{item.productId} x {item.quantity}
        </div>
      ))}

      <button
        disabled={isAdding}
        onClick={() =>
          addToCart({
            userId,
            productId: 1,
            quantity: 1,
          })
        }
      >
        {isAdding ? "Adding..." : "Add Item"}
      </button>
    </div>
  );
}
