import { NextFunction, Request, Response } from "express"

const asyncHandler =
  (controller: (req: Request, res: Response) => void) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res)
    } catch (error) {
      return next(error)
    }
  }
export default asyncHandler
