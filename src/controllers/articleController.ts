import {Request, Response} from 'express'

import { errorGenerator } from '../utils/errorGenerator'
import asyncWrapper from '../utils/asyncWrapper'
import { ApiResponse } from '../utils/response'
import { AuthRequest }  from '../interfaces/userInterface'
import { BAD_REQUEST_400, SUCCESS_200, UNAUTHORIZED_401,NOT_FOUND_404 } from '../utils/statuses'
import { ArticleService } from '../services'


const getArticle = asyncWrapper(async(req: Request, res: Response) => {
  if (isNaN(Number(req.params['articleId']))) {
    errorGenerator(BAD_REQUEST_400)
  }
  const articleId: number = Number(req.params['articleId'])
  const article = await ArticleService.findArticle({id: articleId})
  new ApiResponse({ ...SUCCESS_200, data: article }).send(res)
})


const getArticles = asyncWrapper(async(req: Request, res: Response) => {
  const articles = await ArticleService.findArticles()
  new ApiResponse({ ...SUCCESS_200, data: articles }).send(res)
})


const createArticle = asyncWrapper(async(req: AuthRequest, res: Response) => {
  const { title, description } = req.body
  const { id: user_id } = req.user
  
  if (!title || !description) {
    errorGenerator(BAD_REQUEST_400)
  }

  await ArticleService.createArticle({
    title: title,
    description: description,
    user_id: user_id
  })
  new ApiResponse(SUCCESS_200).send(res)
})


const updateArticle = asyncWrapper(async(req: AuthRequest, res: Response) => {
  if (isNaN(Number(req.params['articleId']))) {
    errorGenerator(BAD_REQUEST_400)
  }
  const articleId: number = Number(req.params['articleId'])
  const {id: user_id } = req.user
  const { title, description } = req.body
  if (!title && !description) {
    errorGenerator(BAD_REQUEST_400)
  }
  const foundArticle = await ArticleService.findArticle({id: articleId})
  if (!foundArticle) {
    errorGenerator(NOT_FOUND_404)
  }
  if (user_id !== foundArticle['user_id']) {
    errorGenerator(UNAUTHORIZED_401)
  }
  const updatedArticle = await ArticleService.updateArticle({id: articleId, ...req.body})
  new ApiResponse(SUCCESS_200).send(res)
})


const deleteArticle = asyncWrapper(async(req: AuthRequest, res: Response) => {
  if (isNaN(Number(req.params['articleId']))) {
    errorGenerator(BAD_REQUEST_400)
  }
  const articleId: number = Number(req.params['articleId'])
  const {id: user_id } = req.user
  const foundArticle = await ArticleService.findArticle({id: articleId})
  if (!foundArticle) {
    errorGenerator(NOT_FOUND_404)
  }
  if (user_id !== foundArticle['user_id']) {
    errorGenerator(UNAUTHORIZED_401)
  }
  const deletedArticle = await ArticleService.deleteArticle({id: articleId})
  new ApiResponse(SUCCESS_200).send(res)
})


export default {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
}