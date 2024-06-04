import { ErrorRequestHandler, NextFunction, Request, Response } from "express"

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404)
  const error = new Error(`Not Found - ${req.originalUrl}`)
  next(error)
}

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  //   If Mongoose not found error, set to 404 and change message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404
    message = "Resource Not Found"
  }

  res.status(statusCode)
  res.json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
}

export { notFound, errorHandler }
