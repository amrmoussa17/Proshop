import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"

interface RequestInfo extends Request {
  user?: {
    name: string
    email: string
    isAdmin: boolean
  }
}

const asyncHandler =
  (controller: (req: RequestInfo, res: Response, next: NextFunction) => void) =>
  async (req: RequestInfo, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next)
    } catch (error) {
      return next(error)
    }
  }
export default asyncHandler
