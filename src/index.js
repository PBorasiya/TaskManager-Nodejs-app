const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')
const app = express()
const port = process.env.PORT || 3000
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('Serves is up on port ' + port)
})

const jwt = require('jsonwebtoken')

const myFunc = async () =>{
    const token = jwt.sign({ _id : '1234' },'thisispranavsapp', { expiresIn : '7 days'})
    console.log(token)

    const data = jwt.verify(token,'thisispranavsapp')
    console.log(data)
}

myFunc()
// CODE WITHOUD ASYNC/AWAIT ONLY WORKS WITH PROMISE CHAINING. ABOVE CODE IS BETTER IN TERMS OF READABILITY
// app.post('/users',(req,res)=>{
//     const user = new User(req.body)
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })
// })
// app.get('/users',(req,res) => {
//     User.find({}).then((users)=>{
//         res.send(users)
//     }).catch((e)=>{
//         res.status(500).send()
//     })
// })
// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id
    
//     User.findById({_id}).then((user) => {
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e) => {
//         res.status(500).send()
//     })
    
// })


// app.post('/tasks',(req,res)=>{
//     const task = new Task(req.body)
//     task.save().then(()=>{
//         res.status(201).send(task)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })
// app.get('/tasks', (req,res) => {
//     Task.find({}).then((tasks) => {
//         res.send(tasks)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })
// app.get('/tasks/:id', (req,res) => {
//     const _id = req.params.id

//     Task.findById(_id).then((task) => {
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })


