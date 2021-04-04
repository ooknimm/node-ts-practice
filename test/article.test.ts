import { expect } from "chai";
import prisma from "../src/prisma";

const app = require('../src/app').default
const request = require('supertest');


const userData = {name:'kim', password:'123'}
const articleData = [
  {id:1, title:'hi1', description:'hi~~~~~~1',user_id:1},
  {id:2, title:'hi2', description:'hi~~~~~~2',user_id:1},
  {id:3, title:'hi3', description:'hi~~~~~~3',user_id:1},
]

interface articleObject {
  id: number
  title: string
  description: string
  user_id: number
}

const creataMany = (data: articleObject[]) => {
  data.forEach(async (article) => {
    await prisma.articles.create({ data: article })
  })
}

const auth = {}


describe('POST signup', function() {
  it('success', function(done) {
  request(app)
    .post('/users/signup')
    .send({name: 'user10', password: '1q2w'})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err)
      done()
    })
  })
});
describe('POST login', function() {
  it('success', function(done) {
  request(app)
    .post('/users/login')
    .send({name: 'user10', password: '1q2w'})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      auth['token'] = res.body.token
      if (err) return done(err)
      done()
    })
  })
});


describe('ARTICLE TEST', function() {
  this.beforeAll( async () => {
    await prisma.users.create({ data: userData })
    creataMany(articleData)
  })
  this.afterAll( async () => {
    await prisma.$queryRaw('SET FOREIGN_KEY_CHECKS=0')
    await prisma.$queryRaw('TRUNCATE articles')
    await prisma.$queryRaw('TRUNCATE users')
    await prisma.$queryRaw('SET FOREIGN_KEY_CHECKS=1')
    await prisma.$disconnect()
  })
  describe('GET articles', function() {
    it('success', function(done) {
    request(app)
      .get('/articles/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res)=> {
        expect(res.body.data).to.eql(articleData)
        done()
      })
      .catch(err => {
        return done(err)
      })
    })
  });
  describe('GET articles', function() {
    it('success', function(done) {
    request(app)
      .get('/articles/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res)=> {
        expect(res.body.data).to.eql(articleData[2])
        done()
      })
      .catch(err => {
        return done(err)
      })
    })
  });
  describe('POST articles', function() {
    it('success', function(done) {
      request(app)
      .post('/articles/')
      .set('Accept', 'application/json')
      .set('authorization', auth['token'])
      .send({title: 'my title', description: 'my description'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      })
    })
  });
  describe('PUT articles', function() {
    it('success', function(done) {
      request(app)
      .put('/articles/4')
      .set('Accept', 'application/json')
      .set('authorization', auth['token'])
      .send({title: 'my title22', description: 'my description22'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      })
    })
  });
  describe('DELETE articles', function() {
    it('success', function(done) {
      request(app)
      .delete('/articles/4')
      .set('Accept', 'application/json')
      .set('authorization', auth['token'])
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      })
    })
  });
})
