import app from './app'
import { PORT, ENVIRONMENT } from './config'
import { logger } from './utils/logger'
import prisma from './prisma'


const start = () => {app.listen(PORT, '0.0.0.0', async () => {
  try{ 
    logger.info('##############################################################################')
    logger.info('server start')
    logger.info(`server running ${PORT}`)
    logger.info(`environment is ${ENVIRONMENT}`)
    logger.info('##############################################################################')
  } catch (err) {
    logger.info(err)
    console.error(err)
  } finally {
    await prisma.$disconnect()
  }}
)}
start()