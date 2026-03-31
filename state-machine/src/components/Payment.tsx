import { useState } from "react";

export default function Payment({ state, send }: any) {
  const [method, setMethod] = useState("card");

  const error = state.context.errors?.paymentError;

  return (
    <div>
      <h2>Payment</h2>

      <select onChange={(e) => setMethod(e.target.value)}>
        <option value="card">Card</option>
        <option value="upi">UPI</option>
      </select>

      <button
        onClick={() =>
          send({
            type: "SUBMIT_PAYMENT",
            data: { method, status: "pending" },
          })
        }
      >
        Pay
      </button>

      <button onClick={() => send({ type: "BACK" })}>Back</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {state.matches("payment.failure") && (
        <button onClick={() => send({ type: "RETRY_PAYMENT" })}>
          Retry Payment
        </button>
      )}
    </div>
  );
}