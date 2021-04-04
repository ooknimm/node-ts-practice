import { Router } from 'express'

import UserRouter from './userRouter'
import ArticleRouter from './articleRouter'


const router = Router()

router.use('/users', UserRouter)
router.use('/articles', ArticleRouter)

export default router