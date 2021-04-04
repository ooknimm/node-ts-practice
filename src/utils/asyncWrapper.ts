import { RequestHandler, Request, Response, NextFunction } from 'express'


const asyncWrapper = (controller: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controller(req, res, next)
  } catch(err) {
    next(err)
  }
}

export default asyncWrapper