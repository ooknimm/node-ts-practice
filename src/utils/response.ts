import { Response } from 'express'
import { logger } from './logger'

enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FOBBIDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500
}

interface headerObject {
  [key: string] : string
}

interface responseObject<T> {
  statusCode: StatusCode
  message: string
  data?: T
  token?: string
  headers?: headerObject
  codeMessage?: string
}

export class ApiResponse<T> {
  statusCode: StatusCode
  message: string
  data?: T
  token?: string
  headers?: headerObject
  codeMessage?: string
  constructor( resp : responseObject<T>) {
    this.statusCode = resp.statusCode
    this.message = resp.message
    this.data = resp.data
    this.token = resp.token
    this.headers = resp.headers
    this.codeMessage = resp.codeMessage
  }
  protected prepare<U extends ApiResponse<T>>(res: Response, response: U): Response {
    if (response.headers) {
      Object.entries(response.headers).map((header) => {
        const key = header[0]
        const value = header[1]
        res.setHeader(key, value)
      delete response.headers
      })
    }
    logger.info(response.message)
    return res.status(response.statusCode).json(response)
  }
  public send(res: Response): Response {
    return this.prepare<ApiResponse<T>>(res, this);
  }
}