import { PRODUCTS_URL } from "../helpers/constants"
import { ProductType } from "../helpers/types"
import { apiSlice } from "./apiSlice"

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any, { pageNumber: number; search: string }>({
      query: ({ pageNumber, search }) => ({
        url: `${PRODUCTS_URL}`,
        params: { pageNumber, search },
      }),
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
    updateProduct: builder.mutation<ProductType, ProductType>({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopProducts: builder.query<ProductType[], void>({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice
