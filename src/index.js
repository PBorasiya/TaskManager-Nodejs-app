const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// app.post('/users',(req,res)=>{
//     const user = new User(req.body)
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })
// })

app.post('/users', async (req,res) => {
    const user = new User(req.body)

    try{

        await user.save()
        res.status(201).send(user)

    }catch(e){
        res.status(400).send(e)
    }
})

// app.get('/users',(req,res) => {
//     User.find({}).then((users)=>{
//         res.send(users)
//     }).catch((e)=>{
//         res.status(500).send()
//     })
// })

app.get('/users', async (req,res) => {
    try{
        const users = await User.find({})
        res.status(200).send(users)
    }catch(e){
        res.status(404).send(e)
    }
})

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

app.get('/users/:id', async (req,res) => {
    const _id = req.params.id;

    try{
        const user = await User.findById({_id})
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})


// app.post('/tasks',(req,res)=>{
//     const task = new Task(req.body)
//     task.save().then(()=>{
//         res.status(201).send(task)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })

app.post('/tasks', async ( req, res ) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(404).send(e)
    }
})

// app.get('/tasks', (req,res) => {
//     Task.find({}).then((tasks) => {
//         res.send(tasks)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

app.get('/tasks', async (req, res) => {
    try{

        const tasks = await Task.find({})
        if(!tasks){
            return res.status(404).send()
        }
        res.status(200).send(tasks)
        
    }catch(e){
        res.status(500).send(e)
    }
})

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

app.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id

    try{
        const task = await Task.findById({_id})
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

app.patch('/users/:id' , async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email' ,'password' , 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error : 'Invalid update! property does not exist'})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body , { new : true, runValidators : true})
        if(!user){
            return res.status(404).send()
        }

        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

app.listen(port,()=>{
    console.log('Serves is up on port ' + port)
})