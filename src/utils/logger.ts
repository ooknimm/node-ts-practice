import fs from 'fs'
import moment from 'moment'

import { createLogger, transports, format } from 'winston'

import { DIR } from '../config'


if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR)
} 

const nowDatetime = () => {
  let now = moment().format('YYYY-MM-DD hh:mm:ss');
  return now
}

const inforTransport = new transports.File({
  filename: 'info.log',
  dirname: DIR,
  level: 'info',
  format: format.printf(i => `${nowDatetime()} - ${i.level.toUpperCase()} - ${i.message}`)
})

const consoleTrasport = new transports.Console({
  format: format.printf(i => `${nowDatetime()} - ${i.level.toUpperCase()} - ${i.message}`)
})

const logger = createLogger({
  transports: [inforTransport, consoleTrasport, ]
})

const stream = {
  write: (message: string) => {
    logger.info(message)
  }
}

export { logger, stream }