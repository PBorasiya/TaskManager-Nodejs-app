const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id : userOneId,
    name : 'UserOne',
    email : 'parixit.borasia@gmail.com',
    password : 'pranav123',
    tokens : [{
        token : jwt.sign({_id : userOneId} , process.env.JWT_SECRET)
    }]
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

test('Should get profile for a user' , async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})