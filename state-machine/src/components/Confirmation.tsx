export default function Confirmation({ send }:any) {
  return (
    <div>
      <h2>Order Confirmed 🎉</h2>

      <button onClick={() => send({ type: "RESET" })}>
        Start Over
      </button>
    </div>
  );
}