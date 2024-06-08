import { createSlice } from "@reduxjs/toolkit"
import { updateCart } from "../helpers/cartUtils"

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [] }

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      updateCart(state, item)
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer
