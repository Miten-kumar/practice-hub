type PaymentMethod = "CARD" | "UPI" | "NETBANKING";
type PaymentStatus = "idle" | "processing" | "success" | "failed";

interface PaymentProps {
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  onPay: (paymentMethod: PaymentMethod) => void;
}

const paymentMethods: PaymentMethod[] = ["CARD", "UPI", "NETBANKING"];

export default function Payment({
  paymentMethod,
  paymentStatus,
  totalAmount,
  onPay,
}: PaymentProps) {
  return (
    <section>
      <h2>Payment</h2>
      <p>Total Amount: {totalAmount}</p>

      <fieldset disabled={paymentStatus === "processing"}>
        <legend>Select Payment Method</legend>
        {paymentMethods.map((method) => (
          <label key={method} style={{ display: "block" }}>
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === method}
              onChange={() => onPay(method)}
            />
            {method}
          </label>
        ))}
      </fieldset>

      <p>Payment Status: {paymentStatus}</p>

      {paymentStatus === "processing" ? <p>Processing payment...</p> : null}
      {paymentStatus === "failed" ? (
        <p>Payment failed. Please try again.</p>
      ) : null}
    </section>
  );
}
