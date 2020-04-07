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
    const response = await request(app).post('/users').send({
        name : 'Pranav',
        email : 'borasiyapranav@gmail.com',
        password : 'pranav123'
    }).expect(201)

    //assertions about response
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user : {
            name : 'Pranav',
            email : 'borasiyapranav@gmail.com'
        },
        token : user.tokens[0].token
    })
    expect(user.password).not.toBe('pranav123')
})

test('Should log in existing user', async()=>{
    const response = await request(app).post('/users/login').send({
        email : userOne.email,
        password : userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)

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

test('should not get profile for anauthenticated user', async()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for Authenticated user', async() =>{
    await request(app)
        .delete('/users/me')
        .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unAuthenticated user', async() =>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})