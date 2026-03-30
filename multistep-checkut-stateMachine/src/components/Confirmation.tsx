import type { CartItem } from "./Cart.js";

type PaymentMethod = "CARD" | "UPI" | "NETBANKING";
type PaymentStatus = "idle" | "processing" | "success" | "failed";

interface ConfirmationProps {
  items: CartItem[];
  totalAmount: number;
  address: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
}

export default function Confirmation({
  items,
  totalAmount,
  address,
  paymentMethod,
  paymentStatus,
}: ConfirmationProps) {
  return (
    <section>
      <h2>Order Confirmation</h2>

      <p>Payment Method: {paymentMethod}</p>
      <p>Payment Status: {paymentStatus}</p>
      <p>Delivery Address: {address}</p>
      <p>Total Amount: {totalAmount}</p>

      <div>
        <h3>Ordered Items</h3>
        <ul>
          {items.map((item) => (
            <li key={`${item.item_id}-${item.quantity}-${item.price}`}>
              {item.item_id} | Qty: {item.quantity} | Price: {item.price}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
