import { ORDERS_URL } from "../helpers/constants"
import { apiSlice } from "./apiSlice"

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => `${ORDERS_URL}/${id}`,
    }),
  }),
})

export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  ordersApiSlice
