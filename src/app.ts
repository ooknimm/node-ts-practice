import express, { Request, Response, NextFunction } from 'express'

import cors from 'cors'
import morgan from 'morgan'

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerOptions from './swagger/swagger'

import { stream, logger } from './utils/logger'
import { NOT_FOUND_404 } from './utils/statuses'
import { errorGenerator, ErrorWithStatusCode } from './utils/errorGenerator'
import routes from './routes'


const app = express();

// cors header setting
app.use(cors())

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// logging
app.use(morgan('combined', { stream }))

// swagger api documents
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)))

// routing
app.use(routes)

// 404 error catch
app.use((req: Request, res: Response) => errorGenerator({...NOT_FOUND_404, message:'this is not found error'}))

// err handler
app.use((err: ErrorWithStatusCode, req: Request, res: Response, next: NextFunction) => {
  const { message, statusCode, codeMessage } = err
  logger.error(message)
  res.status(statusCode || 500).json({message: message, codeMessage: codeMessage || 'internal server error'})
})

export default app