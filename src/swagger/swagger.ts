import { SwaggerDefinition } from 'swagger-jsdoc'


const swaggerDefinition: SwaggerDefinition = {
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [
    { jwt: [] }
  ],
  //swagger 정보
  info: {
    title: 'swagger API 문서',
    version: '1.0.0',
    description: 'api 문서입니다.'
  },
  // 기본 루트 경로
  basePath: '/',
  // 모든 api에 대한 공통 정의
  components: {
    res: {
      NotFound: {description: 'notfound'}
    },
  },
  // 통신방식
  schemes: ['http']
}
export default {
  swaggerDefinition,
  apis: ['../**/*.ts']
}