import { PRODUCTS_URL } from "../helpers/constants"
import { ProductType } from "../helpers/types"
import { apiSlice } from "./apiSlice"

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => `${PRODUCTS_URL}`,
    }),
    getProductDetails: builder.query<ProductType, string | void>({
      query: (id) => `${PRODUCTS_URL}/${id}`,
    }),
  }),
})

export const { useGetProductsQuery, useGetProductDetailsQuery } = productSlice
