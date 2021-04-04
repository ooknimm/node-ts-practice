import prisma from '../prisma'

import { ArticleCreateInput, ArticleUpdateInput, ArticleDeleteInput } from '../interfaces/articleInterface'


const findArticle = (data) => {
  return prisma.articles.findUnique({where: data})
}


const findArticles = () => {
  return prisma.articles.findMany()
}


const createArticle = (data: ArticleCreateInput) => {
  return prisma.articles.create({ data })
}


const updateArticle = (data: ArticleUpdateInput) => {
  const { id } = data
  return prisma.articles.update({
    where: { id },
    data: data
  })
}


const deleteArticle = (data: ArticleDeleteInput) => {
  return prisma.articles.delete({ where: data })
}


export default {
  findArticle,
  findArticles,
  createArticle,
  updateArticle,
  deleteArticle
}