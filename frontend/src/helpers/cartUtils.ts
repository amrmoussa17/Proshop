import { CartType } from "./types"

const addDecimals = (num: number) => (Math.round(num * 100) / 100).toFixed(2)

export const updateCart = (state: CartType) => {
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
  state.itemsQty = state.cartItems.reduce((acc, item) => acc + item.qty, 0)

  localStorage.setItem("cart", JSON.stringify(state))
}
