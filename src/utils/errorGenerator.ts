interface BaseError {
  message: string,
  statusCode?: number,
  codeMessage?: string
}

export interface ErrorWithStatusCode extends Error {
  statusCode?: number,
  codeMessage?: string
}

export const errorGenerator = (errorBase: BaseError) => {
  const message = errorBase.message
  const statusCode = errorBase.statusCode
  const codeMessage = errorBase.codeMessage
  
  const err: ErrorWithStatusCode = new Error(message)
  err.statusCode = statusCode
  err.codeMessage = codeMessage
  throw err
}