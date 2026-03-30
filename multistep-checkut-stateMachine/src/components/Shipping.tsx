import { useState } from "react";

interface ShippingProps {
  address: string;
  onDeliverToThisAddress: (address: string) => void;
}

export default function Shipping({
  address,
  onDeliverToThisAddress,
}: ShippingProps) {
  const [shippingAddress, setShippingAddress] = useState(address);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDeliverToThisAddress(shippingAddress);
  };

  return (
    <section>
      <h2>Shipping</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            value={shippingAddress}
            onChange={(event) => setShippingAddress(event.target.value)}
            placeholder="Flat / House number, area, city, pincode"
            rows={4}
            required
          />
        </div>

        <button type="submit">Deliver To This Address</button>
      </form>
    </section>
  );
}
