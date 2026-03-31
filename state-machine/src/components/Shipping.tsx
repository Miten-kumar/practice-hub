import { useState } from "react";

export default function Shipping({ state, send }: any) {
  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
  });

  const error = state.context.errors?.shippingError;

  return (
    <div>
      <h2>Shipping</h2>

      <input
        placeholder="Address"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <button
        onClick={() =>
          send({
            type: "SUBMIT_SHIPPING",
            data: form,
          })
        }
      >
        Submit
      </button>

      <button onClick={() => send({ type: "BACK" })}>Back</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {state.matches("shipping.error") && (
        <button onClick={() => send({ type: "RETRY_SHIPPING" })}>
          Retry
        </button>
      )}
    </div>
  );
}