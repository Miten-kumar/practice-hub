export const services = {
  processPayment : async ()=>{
    await new Promise((resolve) => setTimeout(resolve,2000))

    if(Math.random() > 0.50)
      return "Payment sucessfull"
    else 
      throw new Error("Payment failed")
  }

}