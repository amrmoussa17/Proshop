export interface ProductType {
  _id: string
  name: string
  image: string
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
}
export interface CartItemType extends ProductType {
  qty: number
}
export interface ShippingAddress {
  address: string
  city: string
  postalCode: string
  country: string
}
export interface CartType {
  cartItems: CartItemType[]
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  itemsQty: number
  shippingAddress: ShippingAddress
  paymentMethod: string
}

export interface UserType {
  _id?: string
  name: string
  email: string
  isAdmin: boolean
}
