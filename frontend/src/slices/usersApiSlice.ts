import { USERS_URL } from "../helpers/constants"
import { UserType } from "../helpers/types"
import { apiSlice } from "./apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      UserType,
      { email: string; password: string } | void
    >({
      query: (body) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = usersApiSlice
