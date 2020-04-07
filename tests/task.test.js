const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')
const { userOneId , userOne , setupDatabase, userTwo, userTwoId } = require('./fixtures/db')


beforeEach(setupDatabase)


test('Should create a task for user' , async()=>{
    const response = await request(app)
                    .post('/tasks')
                    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
                    .send({
                        discription : 'From my test'
                    })
                    .expect(201)
            
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should get all the tasks for given user' , async() => {
    const response = await request(app)
                    .get('/tasks')
                    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
                    .send()
                    .expect(200)

    expect(response.body.length).toEqual(1)
})