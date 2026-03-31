import { useEffect } from "react";
import { useMachine } from "@xstate/react";
import { checkoutMachine } from "../machine/checkout.machine";

const STORAGE_KEY = "checkout_state";

export const useCheckoutMachine = () => {
  const persisted = localStorage.getItem(STORAGE_KEY);

  const [state, send] = useMachine(checkoutMachine, {
    state: persisted ? JSON.parse(persisted) : undefined,
  });

  // persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return { state, send };
};