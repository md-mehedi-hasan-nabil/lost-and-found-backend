import { NextFunction, Request, RequestHandler, Response } from 'express'

export const handleAsyncRequest = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
      console.log(error)
      next(error)
    })
  }
}

// export const handleAsyncRequest = (fn: RequestHandler) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await fn(req, res, next)
//     } catch (error) {
//       next(error)
//     }
//   }
// }
