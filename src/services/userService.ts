import prisma from '../prisma'
import { userInfoData, userInPutData } from '../interfaces/userInterface'

const findUser = (user: userInfoData) => {
  const [key] = Object.keys(user)
  return prisma.users.findFirst({ where: { [key]: user[key] } })
}

const createUser = (data: userInPutData) => {
  return prisma.users.create({ data })
}

export default {
  findUser,
  createUser
}