import { createSlice } from "@reduxjs/toolkit"
import { updateCart } from "../helpers/cartUtils"

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" }

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find(
        (x: { _id: string }) => x._id === item._id
      )
      if (existItem) {
        state.cartItems = state.cartItems.map((x: { _id: string }) =>
          x._id === existItem._id ? item : x
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      updateCart(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item: { _id: string }) => item._id !== action.payload
      )
      updateCart(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem("cart", JSON.stringify(state))
    },
  },
})

export const { addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions

export default cartSlice.reducer
