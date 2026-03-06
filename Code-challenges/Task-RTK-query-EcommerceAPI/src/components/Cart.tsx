import { useGetCartQuery} from "../Redux/features/cartSlice";
import type { CartItem } from "../types/types";

const Cart = () => {
  const { data, isLoading } = useGetCartQuery();

  if (isLoading) return <p>Loading cart...</p>;

  return (
    <div>
      <h2>Cart</h2>

      {data?.items?.length === 0 && <p>Cart is empty</p>}

      {data?.items?.map((item:CartItem) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>Qty: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;