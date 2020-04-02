const request = require('supertest')
const app = require('../src/app')

test('Should sign up a new user', async ()=>{
    await request(app).post('/users').send({
        name : 'Pranav',
        email : 'borasiyapranav@gmail.com',
        password : 'pranav123'
    }).expect(201)
})