import bcrypt from "bcrypt"
import asyncHandler from "../middleware/asyncHandler"
import User from "../models/userModel"
import jwt from "jsonwebtoken"
import generateToken from "../utils/generateToken"
/*
 @@ desc Auth user and get token
 @@ Route POST /api/users/auth
 @@ Access public 
 */
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})
/*
 @@ desc logout user clear cookie
 @@ Route POST /api/users/logout
 @@ Access public 
 */
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt")
  res.status(200).json({ message: "Logged out successfully" })
})
/*
 @@ desc register a new user
 @@ Route POST /api/users
 @@ Access public 
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("user already exists")
  }
  const user = await User.create({
    email,
    name,
    password: bcrypt.hashSync(password, 10),
  })
  if (user) {
    generateToken(res, user._id)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})
/*
 @@ desc get user profile 
 @@ Route GET /api/users/profile
 @@ Access private 
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile")
})
/*
 @@ desc update user profile 
 @@ Route PUT /api/users/profile
 @@ Access private 
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile")
})
/*
 @@ desc get all users
 @@ Route GET /api/users
 @@ Access private/admin 
 */
export const getUsers = asyncHandler(async (req, res) => {
  res.send("get users")
})
/*
 @@ desc get a user by id
 @@ Route GET /api/users/:id
 @@ Access private/admin 
 */
export const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id")
})
/*
 @@ desc update user 
 @@ Route PUT /api/users/:id
 @@ Access private/admin 
 */
export const updateUser = asyncHandler(async (req, res) => {
  res.send("update user")
})
/*
 @@ desc delete a user
 @@ Route DELETE /api/users/:id
 @@ Access private/admin 
 */
export const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user")
})
