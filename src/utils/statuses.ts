interface BaseStatus {
  message: string
  statusCode: number
  codeMessage?: string
}


export const SUCCESS_200: BaseStatus = {
  message: 'success',
  statusCode: 200,
}

export const INTERNAL_500: BaseStatus = {
  message: 'internal server error',
  statusCode: 500,
  codeMessage: 'internal server error'
}

export const NOT_FOUND_404: BaseStatus = {
  message: 'not found',
  statusCode: 404,
  codeMessage: 'not found'
}

export const BAD_REQUEST_400: BaseStatus = {
  message: 'bad request',
  statusCode: 400,
  codeMessage: 'bad request'
}

export const UNAUTHORIZED_401: BaseStatus = {
  message: 'unauthorized',
  statusCode: 401,
  codeMessage: 'unauthorized'
}

export const FOBBIDEN_403: BaseStatus = {
  message: 'fobbiden',
  statusCode: 403,
  codeMessage: 'fobbiden'
}