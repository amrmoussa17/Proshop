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
        url: `${USERS_URL}/auth`,
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<UserType, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation<
      UserType,
      {
        name: string
        email: string
        password: string
      } | void
    >({
      query: (body) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body,
      }),
    }),
    profile: builder.mutation({
      query: (body) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: body,
      }),
    }),
    getUsers: builder.query<UserType[], void>({
      query: () => `${USERS_URL}`,
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = usersApiSlice
