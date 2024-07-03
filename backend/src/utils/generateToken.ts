import jwt from "jsonwebtoken"
import { Response } from "express"

const generateToken = (res: Response, userId: unknown) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!)
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
}
export default generateToken
