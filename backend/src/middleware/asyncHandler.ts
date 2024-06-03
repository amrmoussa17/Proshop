import { NextFunction, Request, Response } from "express"

const asyncHandler =
  (controller: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      controller(req, res, next)
    } catch (error) {
      next(error)
    }
  }
export default asyncHandler
