import dotenv from 'dotenv'
import path from 'path'


if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: path.join(__dirname, '../test/.test.env') })
}
else {
  dotenv.config()
}

const PORT: number = Number(process.env.PORT) || 8000
const ENVIRONMENT: string = process.env.NODE_ENV || 'development' 
const DIR = './logs'
const TOKEN_SALT = process.env.TOKEN_SALT
export { PORT, ENVIRONMENT, DIR, TOKEN_SALT }