const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/tasks', auth , async ( req, res ) => {
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(404).send(e)
    }
})

router.get('/tasks', auth ,async (req, res) => {
    const match = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    try{
        //binds and populates logged in users tasks virtual tasks property 
        //populate function can be customized to help set querystring attributes
        await req.user.populate({
            path: 'tasks',
            match,
            options :{
                limit : parseInt(req.query.limit),  //number of document per page
                skip : parseInt(req.query.skip) //number of documents to skip. basically skipping to page n
                //after skipping skip 
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)
        
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id

    try{
        //gets the task created by loggen in user
        const task = await Task.findOne({ _id , owner : req.user._id })

        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


router.patch('/tasks/:id' , auth ,async ( req, res ) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['discription' , 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error : 'Invalid update!! Please enter valid field'})
    }
    
    try{
        const task = await Task.findOne({ _id : req.params.id, owner : req.user._id })
        if(!task){
            res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth ,async (req,res) => {
    
    try{
        const task = await Task.findByIdAndDelete({ _id : req.params.id, owner : req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)

    }catch(e){
        res.status(400).send(e)
    }
})


module.exports = router