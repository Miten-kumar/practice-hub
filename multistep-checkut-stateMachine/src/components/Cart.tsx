import { useState } from "react";

export interface CartItem {
  item_id: string;
  quantity: number;
  price: number;
}

interface CartProps {
  items: CartItem[];
  totalAmount: number;
  onAddToCart: (item: CartItem) => void;
  onCheckout: () => void;
}

const initialFormState: CartItem = {
  item_id: "",
  quantity: 1,
  price: 0,
};

export default function Cart({
  items,
  totalAmount,
  onAddToCart,
  onCheckout,
}: CartProps) {
  const [formState, setFormState] = useState<CartItem>(initialFormState);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddToCart(formState);
    setFormState(initialFormState);
  };

  return (
    <section>
      <h2>Cart</h2>

      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="item_id">Item Id</label>
          <input
            id="item_id"
            value={formState.item_id}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                item_id: event.target.value,
              }))
            }
            placeholder="ITEM-101"
            required
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={formState.quantity}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                quantity: Number(event.target.value),
              }))
            }
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            min={0}
            step="0.01"
            value={formState.price}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                price: Number(event.target.value),
              }))
            }
            required
          />
        </div>

        <button type="submit">Add To Cart</button>
      </form>

      <div>
        <h3>Items</h3>
        {items.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={`${item.item_id}-${item.price}`}>
                {item.item_id} | Qty: {item.quantity} | Price: {item.price}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p>Total Amount: {totalAmount}</p>

      <button type="button" onClick={onCheckout} disabled={items.length === 0}>
        Checkout
      </button>
    </section>
  );
}
