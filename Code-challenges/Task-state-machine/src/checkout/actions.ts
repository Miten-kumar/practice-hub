import { assign } from "xstate";

export const actions = {
  saveAddress : assign({
    ddress : (_,event) => event.address
  }),

  setError : assign({
    error :(_,event) => event.error.message
  })
}