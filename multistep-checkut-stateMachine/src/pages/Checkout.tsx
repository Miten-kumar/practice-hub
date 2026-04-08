import { useMachine } from "@xstate/react";

import Cart from "../components/Cart";
import Confirmation from "../components/Confirmation";
import Payment from "../components/Payment";
import Shipping from "../components/Shipping";
import { checkoutMachine } from "../stateMachines/checkoutMachine";

export default function Checkout() {
  const [state, send] = useMachine(checkoutMachine);
  const { items, totalAmount, address, paymentMethod, paymentStatus } =
    state.context;

  return (
    <main>
      <h1>Checkout</h1>

      {state.matches("cart") ? (
        <Cart
          items={items}
          totalAmount={totalAmount}
          onAddToCart={(item) => send({ type: "ADD_TO_CART", item })}
          onCheckout={() => send({ type: "CHECKOUT" })}
        />
      ) : null}

      {state.matches("shipping") ? (
        <Shipping
          address={address}
          onDeliverToThisAddress={(shippingAddress) =>
            send({
              type: "DELEVER_TO_THIS_ADDRESS",
              address: shippingAddress,
            })
          }
        />
      ) : null}

      {state.matches("payment") ? (
        <Payment
          paymentMethod={paymentMethod}
          paymentStatus={paymentStatus}
          totalAmount={totalAmount}
          onPay={(selectedPaymentMethod) =>
            send({ type: "PAY", paymentMethod: selectedPaymentMethod })
          }
        />
      ) : null}

      {state.matches("confirmation") ? (
        <Confirmation
          items={items}
          totalAmount={totalAmount}
          address={address}
          paymentMethod={paymentMethod}
          paymentStatus={paymentStatus}
        />
      ) : null}
    </main>
  );
}
