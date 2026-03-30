export type Events = 
  |{type:"NEXT",address: string} 
  |{type:"PREV"} 
  |{type:"SUBMIT_PAYMENT"}
  |{type:"SUCESS"}
  |{type:"ERROR"}
  |{type:"RETRY"}

export interface Context {
  cartItems : string[],
  address : string,
  paymentDetails: string,
  error:string
}

