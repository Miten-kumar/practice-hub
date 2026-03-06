export interface Products {
  id: number
  title: string
  price: number
}

export interface CartItem extends Products {
  quantity: number
}

export interface Cart {
  items: CartItem[]
}