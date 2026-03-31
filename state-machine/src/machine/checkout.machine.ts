import { setup, assign, fromPromise } from "xstate";
import {
  type CheckoutContext,
  type CheckoutEvents,
} from "../types/checkoutTypes";

// ---------------- MACHINE ----------------

export const checkoutMachine = setup({
  types: {} as {
    context: CheckoutContext;
    events: CheckoutEvents;
  },

  // ✅ Properly typed actors
  actors: {
    shippingService: fromPromise(
      async ({ input }: { input: CheckoutContext }) => {
        await new Promise((r) => setTimeout(r, 1000));

        if (!input.shippingData?.address) {
          throw new Error("Invalid address");
        }

        return true;
      }
    ),

    paymentService: fromPromise(async () => {
      await new Promise((r) => setTimeout(r, 1000));

      if (Math.random() < 0.5) {
        throw new Error("Payment failed");
      }

      return true;
    }),
  },

  actions: {
    setShipping: assign({
      shippingData: ({ event }) =>
        event.type === "SUBMIT_SHIPPING" ? event.data : null,
    }),

    clearShippingError: assign({
      errors: ({ context }) => ({
        ...context.errors!,
        shippingError: null,
      }),
    }),

    setShippingError: assign({
      errors: ({ context }) => ({
        ...context.errors!,
        shippingError: "Shipping failed",
      }),
    }),

    setPayment: assign({
      paymentData: ({ event }) =>
        event.type === "SUBMIT_PAYMENT" ? event.data : null,
    }),

    clearPaymentError: assign({
      errors: ({ context }) => ({
        ...context.errors!,
        paymentError: null,
      }),
    }),

    setPaymentError: assign({
      errors: ({ context }) => ({
        ...context.errors!,
        paymentError: "Payment failed",
      }),
    }),

    resetContext: assign(() => ({
      cartItems: [],
      shippingData: null,
      paymentData: null,
      errors: {
        shippingError: null,
        paymentError: null,
      },
      retryCount: 0,
    })),

    incRetry: assign({
      retryCount: ({ context }) => context.retryCount + 1,
    }),

    resetRetry: assign({
      retryCount: () => 0,
    }),
  },

  guards: {
    hasCartItems: ({ context }) => context.cartItems.length > 0,
    canRetry: ({ context }) => context.retryCount < 3,
  },
}).createMachine({
  id: "checkout",
  initial: "cart",

  context: {
    cartItems: [{id:"wwww",name:"kmkmkm"}],
    shippingData: null,
    paymentData: null,
    errors: {
      shippingError: null,
      paymentError: null,
    },
    retryCount: 0,
  },

  states: {
    cart: {
      on: {
        NEXT: {
          target: "shipping",
          guard: "hasCartItems",
        },
      },
    },

    shipping: {
      initial: "idle",

      states: {
        idle: {
          on: {
            SUBMIT_SHIPPING: {
              target: "submitting",
              actions: ["setShipping", "clearShippingError"],
            },
            BACK: {
              target: "#checkout.cart",
            },
          },
        },

        submitting: {
          invoke: {
            src: "shippingService",
            input: ({ context }) => context, // ✅ REQUIRED
            onDone: {
              target: "#checkout.payment",
              actions: "resetRetry",
            },
            onError: {
              target: "error",
              actions: ["setShippingError", "incRetry"],
            },
          },
        },

        error: {
          on: {
            RETRY_SHIPPING: {
              target: "submitting",
              guard: "canRetry",
            },
            BACK: {
              target: "#checkout.cart",
            },
          },
        },
      },
    },

    payment: {
      initial: "idle",

      states: {
        idle: {
          on: {
            SUBMIT_PAYMENT: {
              target: "processing",
              actions: ["setPayment", "clearPaymentError"],
            },
            BACK: {
              target: "#checkout.shipping",
            },
          },
        },

        processing: {
          invoke: {
            src: "paymentService",
            onDone: {
              target: "#checkout.confirmation",
              actions: "resetRetry",
            },
            onError: {
              target: "failure",
              actions: ["setPaymentError", "incRetry"],
            },
          },
        },

        failure: {
          on: {
            RETRY_PAYMENT: {
              target: "processing",
              guard: "canRetry",
            },
            BACK: {
              target: "#checkout.shipping",
            },
          },
        },
      },
    },

    confirmation: {
      on: {
        RESET: {
          target: "cart",
          actions: "resetContext",
        },
      },
    },
  },
});