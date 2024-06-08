import { createSlice } from "@reduxjs/toolkit"

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [] }

const addDecimals = (num: number) => (Math.round(num * 100) / 100).toFixed(2)

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

      state.itemsPrice = Number(
        addDecimals(
          state.cartItems.reduce(
            (acc: number, item: { price: number; qty: number }) =>
              acc + item.price * item.qty,
            0
          )
        )
      )
      state.shippingPrice = Number(state.itemsPrice > 100 ? 0 : 10)
      state.taxPrice = Number(addDecimals(state.itemsPrice * 0.14))
      state.totalPrice = Number(
        addDecimals(state.itemsPrice + state.shippingPrice + state.taxPrice)
      )

      localStorage.setItem("cart", JSON.stringify(state))
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer
