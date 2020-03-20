const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const taskSchema = new mongoose.Schema({
    discription : {
        type : String,
        required : true,
        trim : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
}, {
    //this additional option in schema lets you provide created at and updated at 
    //timestamps to provide more details about the data
    timestamps : true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task