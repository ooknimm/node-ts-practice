import { Router } from 'express'
import { ArticleController } from '../controllers'
import validateToken from '../utils/validateToken'

const router = Router()

/**
 * @swagger
 * /articles/:
 *   get:
 *     tags:
 *     - GetArticles
 *     summary: 전체 게시물 조회
 *     description: ""
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *          $ref: "#/definitions/Aritlcles_Response" 
 */
router.get('/', ArticleController.getArticles)

/**
 * @swagger
 * /articles/:
 *   post:
 *     tags:
 *     - CreateArticle
 *     summary: 게시물 생성
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: 제목
 *         type: string
 *       - name: description
 *         description: 내용
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *          $ref: "#/definitions/Success_Response" 
 *       400:
 *         description: 잘못된 값
 *         schema:
 *          $ref: "#/definitions/Response_Error"
 */
router.post('/', validateToken, ArticleController.createArticle)

/**
 * @swagger
 * /articles/{articleId}:
 *   get:
 *     tags:
 *     - GetArticle
 *     summary: 해당 게시물 조회
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: articleId
 *         type: integer
 *         description: 게시물 아이디
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *          $ref: "#/definitions/Success_Response" 
 *       400:
 *         description: 잘못된 쿼리스트링 값
 *         schema:
 *          $ref: "#/definitions/Response_Error"
 */
router.get('/:articleId', ArticleController.getArticle)

/**
 * @swagger
 * /articles/{articleId}:
 *   put:
 *     tags:
 *     - UpdateArticle
 *     summary: 해당 게시물 수정
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: articleId
 *         type: integer
 *         description: 게시물 아이디
 *       - name: title
 *         description: 제목
 *         type: string
 *       - name: description
 *         desciprion: 내용
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *          $ref: "#/definitions/Success_Response" 
 *       400:
 *         description: 잘못된 값
 *         schema:
 *          $ref: "#/definitions/Response_Error"
 *       401:
 *         description: 수행할 권한이 없음
 *         schema:
 *          $ref: "#/definitions/Response_Error"
 *       404:
 *         description: 존재하지 않는 게시물
 *         schema:
 *          $ref: "#/definitions/Response_Error"
 */
router.put('/:articleId', validateToken, ArticleController.updateArticle)

/**
 * @swagger
 * /articles/{articleId}:
 *   delete:
 *     tags:
 *     - DeleteArticle
 *     summary: 해당 게시물 삭제
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: articleId
 *         type: integer
 *         description: 게시물 아이디
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *          $ref: "#/definitions/Success_Response" 
 *       401:
 *         description: 수행할 권한이 없음
 *         schema:
 *          $ref: "#/definitions/Response_Error"
 *       404:
 *         description: 존재하지 않는 게시물
 *         schema:
 *          $ref: "#/definitions/Response_Error"
 */
router.delete('/:articleId', validateToken, ArticleController.deleteArticle)


export default router