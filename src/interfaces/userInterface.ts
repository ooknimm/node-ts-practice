import { Request } from 'express'


interface UserObject {
  id: number
  name: string
  password: string
}

export interface AuthRequest extends Request {
  user?: UserObject
}


export interface userInPutData {
  name: string,
  password: string
}


export interface userInfoData {
  name?: string
  id?: number
}