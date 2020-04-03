const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name : 'UserOne',
    email : 'parixit.borasia@gmail.com',
    password : 'pranav123'
}

beforeEach(async ()=>{
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should sign up a new user', async ()=>{
    await request(app).post('/users').send({
        name : 'Pranav',
        email : 'borasiyapranav@gmail.com',
        password : 'pranav123'
    }).expect(201)
})

test('Should log in existing user', async()=>{
    await request(app).post('/users/login').send({
        email : userOne.email,
        password : userOne.password
    }).expect(200)
})

test('Should not log in non existing user',  async() =>{
    await request(app).post('/users/login').send({
        email : userOne.email,
        password : userOne.password + 's'
    }).expect(400)
})