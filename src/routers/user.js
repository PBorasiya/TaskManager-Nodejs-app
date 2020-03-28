const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail , sendGoodbyeEmail } = require('../emails/account')

const router = new express.Router()

router.post('/users', async (req,res) => {
    const user = new User(req.body)

    try{

        await user.save()
        sendWelcomeEmail(user.email , user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token})

    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) =>{
    try{
        const user = await User.loginUser(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth , async (req,res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()

    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/users/me', auth ,async (req,res) => {
    res.send(req.user)
})


router.patch('/users/me', auth , async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email' ,'password' , 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error : 'Invalid update! property does not exist'})
    }
    try{
        //commented below code because auth middleware takes care of finding the user and attaching
        //user as property on req object as req.user while authanticating the user action
        //const user = await User.findByIdAndUpdate(req.params.id, req.body ,
        // { new : true, runValidators : true})
        //const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])
        
        // if(!req.user){
        //     return res.status(404).send()
        // }

        await req.user.save()
        res.status(200).send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth , async (req, res) =>{
    try{
        //commented below code because auth middleware takes care of finding the user and attaching
        //user as property on req object as req.user while authanticating the user action
        // const user = await User.findByIdAndDelete(req.user._id)

        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        sendGoodbyeEmail(req.user.email,req.user.name)
        res.status(200).send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

const avatar = new multer({
    limits : {
        fileSize : 1000000
    },
    fileFilter(req, file, cb){
        //regular expression or regex
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image image rules'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar', auth,  avatar.single('avatar') , async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({
        width : 250,
        height : 250
    }).png().toBuffer()
    
    req.user.avatar = buffer 
    await req.user.save()
    res.send()
},(error,req,res,next) =>{
    res.status(400).send({ error : error.message})
})

router.delete('/users/me/avatar' , auth , async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send()
}),((error,req,res,next)=>{
    res.status(400).send({ error : error.message })
})

router.get('/users/:id/avatar', async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)

    }catch(e){
        res.status(404).send()
    }
})

module.exports = router