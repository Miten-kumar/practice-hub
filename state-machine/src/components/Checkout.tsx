import { useCheckoutMachine } from "../hooks/useCheckoutMachine";
import Cart from "./Cart";
import Shipping from "./Shipping";
import Payment from "./Payment";
import Confirmation from "./Confirmation";

export default function Checkout() {
  const { state, send } = useCheckoutMachine();
  console.log(state);
  

  if (state.matches("cart")) {
    return <Cart state={state} send={send} />;
  }

  if (state.matches("shipping")) {
    return <Shipping state={state} send={send} />;
  }

  if (state.matches("payment")) {
    return <Payment state={state} send={send} />;
  }

  if (state.matches("confirmation")) {
    return <Confirmation send={send} />;
  }

  return null;
}