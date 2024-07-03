import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserType } from "../helpers/types"

interface authState {
  userInfo: UserType | null
}

const initialState: authState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserType>) => {
      state.userInfo = action.payload
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000
      localStorage.setItem("expirationTime", JSON.stringify(expirationTime))
    },
    logout: (state) => {
      state.userInfo = null
      localStorage.removeItem("userInfo")
      localStorage.removeItem("expirationTime")
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
