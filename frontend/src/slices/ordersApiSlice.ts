import { ORDERS_URL, PAYPAL_URL } from "../helpers/constants"
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
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),
    getPaypalClientId: builder.query<{ clientId: string }, void>({
      query: () => PAYPAL_URL,
    }),
    getMyOrders: builder.query<any, void>({
      query: () => `${ORDERS_URL}/mine`,
    }),
    getOrders: builder.query<any, void>({
      query: () => `${ORDERS_URL}`,
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
} = ordersApiSlice
