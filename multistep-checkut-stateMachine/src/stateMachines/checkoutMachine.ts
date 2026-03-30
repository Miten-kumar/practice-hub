import { assign, fromPromise, setup } from "xstate";

interface Item {
  item_id: string;
  quantity: number;
  price: number;
}

type PaymentMethods = "CARD" | "UPI" | "NETBANKING";
type PaymentStatuses = "idle" | "processing" | "success" | "failed";

interface OrderContext {
  items: Item[];
  totalAmount: number;
  address: string;
  paymentMethod: PaymentMethods;
  paymentStatus: PaymentStatuses;
}

type OrderEvents =
  | { type: "ADD_TO_CART"; item: Item }
  | { type: "CHECKOUT" }
  | { type: "DELEVER_TO_THIS_ADDRESS"; address: string }
  | { type: "PAY"; paymentMethod: PaymentMethods }
  | { type: "SUCCESS" }
  | { type: "FAILURE" };

export const checkoutMachine = setup({
  actors: {
    processPayment: fromPromise(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      return { success: true };
    }),
  },
  types: {
    context: {} as OrderContext,
    events: {} as OrderEvents,
  },
}).createMachine({
  id: "checkout",
  initial: "cart",
  context: {
    items: [],
    totalAmount: 0,
    address: "",
    paymentMethod: "CARD",
    paymentStatus: "idle",
  },
  states: {
    cart: {
      on: {
        ADD_TO_CART: {
          target: "cart",
          actions: assign(({ context, event }) => {
            const updatedItems = [...context.items, event.item];

            const totalAmount = updatedItems.reduce(
              (sum, item: Item) => sum + item.quantity * item.price,
              0,
            );

            return {
              items: updatedItems,
              totalAmount,
            };
          }),
        },
        CHECKOUT: {
          target: "shipping",
        },
      },
    },
    shipping: {
      on: {
        DELEVER_TO_THIS_ADDRESS: {
          target: "payment",
          actions: assign(({ event }) => {
            return { address: event.address };
          }),
        },
      },
    },
    payment: {
      initial: "idle",
      states: {
        idle: {
          on: {
            PAY: {
              target: "processing",
              actions: assign(({ event }) => ({
                paymentMethod: event.paymentMethod,
                paymentStatus: "processing",
              })),
            },
          },
        },

        processing: {
          invoke: {
            src: "processPayment",
            onDone: {
              target: "#checkout.confirmation",
              actions: assign({
                paymentStatus: "success",
              }),
            },
            onError: {
              target: "idle",
              actions: assign({
                paymentStatus: "failed",
              }),
            },
          },
        },
      },
    },
    confirmation: {
      id: "confirmation",
    },
  },
});
