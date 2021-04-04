
// api 문서에 필요한 response 정의
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 회원가입 / 로그인
 * definitions:
 *   Signup_Response:
 *     type: object
 *     required:
 *       - status
 *       - message
 *     properties:
 *       message:
 *        type: string
 *        description: 성공 메시지
 *       status:
 *        type: integer
 *        description: 성공 상태 코드
 *   Auth_Response:
 *     type: object
 *     required:
 *       - status
 *       - message
 *       - token
 *     properties:
 *       message:
 *         type: string
 *         description: 성공 메시지
 *       status:
 *         type: integer
 *         description: 성공 상태 코드 
 *       token:
 *         type: string
 *         description: 계정 정보
 *   Response_Error:
 *     type: object
 *     required:
 *       - message
 *       - codeMessage
 *       - status
 *     properties:
 *       message:
 *         type: string
 *         description: 오류 사유(상세 오류 메시지)
 *       codeMessage:
 *         type: string
 *         description: 오류 사유(오류메시지)
 *       status:
 *         type: integer
 *         description: response code
 */

 
 /**
 * @swagger
 * tags:
 *   name: Article
 *   description: 게시물 CRUD
 * definitions:
 *   Aritlcles_Response:
 *     type: object
 *     required:
 *       - status
 *       - message
 *       - data
 *     properties:
 *       message:
 *        type: string
 *        description: 성공 메시지
 *       status:
 *        type: integer
 *        description: 성공 상태 코드
 *       data:
 *        type: object
 *        description: 게시물
 *   Success_Response:
 *     type: object
 *     required:
 *       - status
 *       - message
 *     properties:
 *       message:
 *         type: string
 *         description: 성공 메시지
 *       status:
 *         type: integer
 *         description: 성공 상태 코드
 */

