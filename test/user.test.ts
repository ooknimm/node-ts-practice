import prisma from "../src/prisma";

const app = require('../src/app').default
const request = require('supertest');


describe('USER TEST', function () {
  this.beforeAll( async () => {
  })
  this.afterAll( async () => {
    await prisma.$queryRaw('SET FOREIGN_KEY_CHECKS=0')
    await prisma.$queryRaw('TRUNCATE users')
    await prisma.$queryRaw('TRUNCATE articles')
    await prisma.$queryRaw('SET FOREIGN_KEY_CHECKS=1')
    await prisma.$disconnect()
  })
  describe('POST signup', function() {
    it('success', function(done) {
    request(app)
      .post('/users/signup')
      .send({name: 'user1', password: '1q2w'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });
  });
  describe('POST login', function() {
    it('success', function(done) {
    request(app)
      .post('/users/login')
      .send({name: 'user1', password: '1q2w'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });
  });
})