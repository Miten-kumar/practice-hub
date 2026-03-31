export type CartItem = {
  id: string;
  name: string;
};

export type ShippingData = {
  address: string;
  city: string;
  postalCode: string;
};

export type PaymentData = {
  method: string;
  status: string;
};

export type Errors = {
  shippingError: string | null;
  paymentError: string | null;
};

export type CheckoutContext = {
  cartItems: CartItem[];
  shippingData: ShippingData | null;
  paymentData: PaymentData | null;
  errors: Errors | null;
  retryCount: number;
};

export type CheckoutEvents =
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "SUBMIT_SHIPPING"; data: ShippingData }
  | { type: "SUBMIT_PAYMENT"; data: PaymentData }
  | { type: "RETRY_SHIPPING" }
  | { type: "RETRY_PAYMENT" }
  | { type: "RESET" };
