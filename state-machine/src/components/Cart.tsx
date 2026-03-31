export default function Cart({ send }: any) {
  return (
    <div>
      <h2>Cart</h2>

      <button
        onClick={() =>
          send({
            type: "NEXT",
          })
        }
      >
        Proceed to Shipping
      </button>
    </div>
  );
}