import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { updateCart } from "../helpers/cartUtils"
import { CartItemType, CartType, ShippingAddress } from "../helpers/types"

const initialState: CartType = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" }

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const item = action.payload
      const existItem = state.cartItems.find(
        (x: { _id: string }) => x._id === item._id
      )
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      updateCart(state)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      )
      updateCart(state)
    },
    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload
      localStorage.setItem("cart", JSON.stringify(state))
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload
      localStorage.setItem("cart", JSON.stringify(state))
    },
    clearCartItems: (state, _action: PayloadAction<void>) => {
      state.cartItems = []
      state.itemsQty = 0
      localStorage.setItem("cart", JSON.stringify(state))
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions

export default cartSlice.reducer
