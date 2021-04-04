import { Router } from 'express'
import { UserController } from '../controllers'

const router = Router()

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *     - SignUp
 *     summary: 회원가입
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: 유저 이름
 *         type: string
 *       - name: password
 *         description: 유저 비밀번호
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *          $ref: "#/definitions/Signup_Response" 
 *       400:
 *         description: 잘못된 데이터
 *         schema:
 *          $ref: "#/definitions/Response_Error"
 */
router.post('/signup', UserController.signUp)

/**
 * @swagger
 *  paths:
 *    /users/login:
 *      post:
 *        tags:
 *        - Login
 *        summary: 로그인
 *        description: ""
 *        produces:
 *        - application/json
 *        parameters:
 *          - name: name
 *            description: 유저 이름
 *            type: string
 *          - name: password
 *            description: 유저 비밀번호
 *            type: string
 *        responses:
 *          200:
 *            description: 로그인 성공
 *            schema:
 *              $ref: "#/definitions/Auth_Response"
 *          400:
 *            description: 잘못된 데이터
 *            schema:
 *              $ref: "#/definitions/Response_Error"
 *          404:
 *            description: 존재하지 않는 유저
 *            schema:
 *              $ref: "#/definitions/Response_Error"
 *          500:
 *            description: 로그인 오류 & 실패
 *            schema:
 *              $ref: "#/definitions/Response_Error"
 */
router.post('/login', UserController.logIn)

export default router