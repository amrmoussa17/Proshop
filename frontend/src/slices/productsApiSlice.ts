import { PRODUCTS_URL } from "../helpers/constants"
import { ProductType } from "../helpers/types"
import { apiSlice } from "./apiSlice"

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => `${PRODUCTS_URL}`,
      providesTags: ["Product"],
    }),
    getProductDetails: builder.query<ProductType, string | void>({
      query: (id) => `${PRODUCTS_URL}/${id}`,
    }),
    createProduct: builder.mutation<ProductType, void>({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
} = productsApiSlice
