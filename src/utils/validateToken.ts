import { Response, NextFunction } from 'express'
import { AuthRequest } from '../interfaces/userInterface'

import jwt from 'jsonwebtoken'
import { errorGenerator } from '../utils/errorGenerator'
import asyncWrapper from '../utils/asyncWrapper'
import { TOKEN_SALT } from '../config'
import UserService  from '../services/userService'
import { BAD_REQUEST_400 } from '../utils/statuses'


const validateToken = asyncWrapper(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
  const user = jwt.verify(token, TOKEN_SALT)
  const foundUser = await UserService.findUser({id: user['id']})

  if (!foundUser) {
    errorGenerator(BAD_REQUEST_400)
  }

  req.user = foundUser
  next()
})

export default validateToken