import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../helpers/constants"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  keepUnusedDataFor: 5,
  tagTypes: ["Product", "User"],
  endpoints: (builder) => ({}),
})
