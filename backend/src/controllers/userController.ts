import bcrypt from "bcrypt"
import asyncHandler from "../middleware/asyncHandler"
import User from "../models/userModel"
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
  const user = await User.findById(req.user!._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("user not found")
  }
})
/*
 @@ desc update user profile 
 @@ Route PUT /api/users/profile
 @@ Access private 
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.findById(req.user!._id)
  if (user) {
    user.name = name || user.name
    user.email = email || user.email
    if (password) {
      user.password = bcrypt.hashSync(password, 10) || user.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("user not found")
  }
})
/*
 @@ desc get all users
 @@ Route GET /api/users
 @@ Access private/admin 
 */
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})
/*
 @@ desc get a user by id
 @@ Route GET /api/users/:id
 @@ Access private/admin 
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password")
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

/*
 @@ desc update user 
 @@ Route PUT /api/users/:id
 @@ Access private/admin 
 */
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})
/*
 @@ desc delete a user
 @@ Route DELETE /api/users/:id
 @@ Access private/admin 
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (user.isAdmin) {
      res.status(400)
      throw new Error("Can not delete admin user")
    }
    await User.deleteOne({ _id: user._id })
    res.json({ message: "User removed" })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})
