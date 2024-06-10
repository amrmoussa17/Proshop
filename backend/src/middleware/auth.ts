import { NextFunction, Request, Response } from "express"
import Jwt from "jsonwebtoken"
import User from "../models/userModel"
import asyncHandler from "./asyncHandler"

interface jwtPayload {
  userId: string
}

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as jwtPayload
      const user = await User.findById(decoded.userId).select("-password")
      if (user) {
        req.user = user
        console.log(req.user)
      }
      next()
    } catch (error) {
      res.status(401)
      throw new Error("Not Authorized, Invalid Token")
    }
  } else {
    res.status(401)
    throw new Error("Not Authorized, No Token Provided")
  }
})

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error("Not Authorized as admin")
  }
})
export { protect, admin }
