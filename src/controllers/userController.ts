import {Request, Response} from 'express'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import asyncWrapper from '../utils/asyncWrapper'
import { ApiResponse } from '../utils/response'
import { errorGenerator } from '../utils/errorGenerator'
import { SUCCESS_200, BAD_REQUEST_400, NOT_FOUND_404 } from '../utils/statuses'
import { UserService } from '../services'
import { TOKEN_SALT } from '../config'


const signUp = asyncWrapper(async (req:Request, res:Response) => {
  const { name, password } = req.body
  if (!name || !password) {
    errorGenerator({...BAD_REQUEST_400, message:'name and password are required'})
  }
  const foundUser = await UserService.findUser({ name: name })
  if (foundUser) {
    errorGenerator({...BAD_REQUEST_400, message:'name already exists'})
  }
  
  const hashedPassword = await bcrypt.hash(password, 10)
  await UserService.createUser ({ name: name, password: hashedPassword })
  new ApiResponse(SUCCESS_200).send(res)
})


const logIn = asyncWrapper(async (req:Request, res:Response) => {
  const { name, password: inputPassword } = req.body
  if (!name || !inputPassword) {
    errorGenerator({...BAD_REQUEST_400, message:'name and password are required'})
  }

  const foundUser = await UserService.findUser({ name:name })
  if (!foundUser) {
    errorGenerator({...NOT_FOUND_404, message:'user not found'})
  }

  const { id, password: hashedPassword } = foundUser
  const isValidPassword: boolean = await bcrypt.compare(inputPassword, hashedPassword)
  if (!isValidPassword) {
    errorGenerator(BAD_REQUEST_400)
  }

  const token: string = jwt.sign({ id: id }, TOKEN_SALT)
  new ApiResponse({...SUCCESS_200, token:token}).send(res)
})


export default {
  signUp,
  logIn
}