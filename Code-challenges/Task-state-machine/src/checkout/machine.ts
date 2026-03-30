import { createMachine } from "xstate";
import { type Context, type Events } from "./types";
import { services } from "./services";
import { actions } from "./actions";

export const checkoutMachine = createMachine<Context, Events>({
  id: "checkout",
  initial: "cart",
  context: {
    cartItems: [],
    address: "",
    paymentDetails: "",
    error: null,
  },
 
  states: {
    cart: {
      on: {
        NEXT: "shipping",
      },
    },
    shipping: {
      on: {
        NEXT:{
          target:'payment',
          actions:'saveAddress'
        },
        PREV: "cart",
      },
    },
    payment: {
      // on: {
      //   SUBMIT_PAYMENT: "confirmation",
      //   ERROR: "error",
      // },

      invoke:{
        src:'processPayment',
        onDone:{
          target:'confirmation',

        },
        onError:{
          target:'error',
          actions:'setError'
        }
      }
    },
    confirmation: {
      on: {
        SUCESS: "shipping",
      },
    },
    error: {    
      on: {
        RETRY: "payment",
        PREV:'shipping'
      },
    },
  }, 
},

{
  services
},
{
  actions
}
);
