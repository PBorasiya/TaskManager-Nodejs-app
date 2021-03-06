const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

const userSchema = new mongoose.Schema({ 
    name : {
        type :String,
        required : true,
        trim : true
    },
    email: {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid');
                
            }
        }
    },
    password: {
        type : String,
        required : true,
        trim : true,
        minlength : 7,
        validate(value){
            
            if (value.toLowerCase().includes('password')){
                throw new Error('Please follow password word rules')
            }
        }
    },
    age : {
        type : Number,
        default : 0,
        validate(value){
            if(value < 0){
                throw new Error('Age cannot be negative')
            }
        }
    },
    //adding tokens as an array so that user can login/logout from multiple accounts and can manage
    //those seasons separately. 
    tokens : [{
        token :{
            type : String,
            required : true
        }
    }],
    //for storing profile pictures, in form of buffer of binary data of the image
    // in database along with user data
    avatar : {
        type : Buffer
    }
},{
    //this additional option in schema lets you provide created at and updated at 
    //timestamps to provide more details about the data
    timestamps : true
})

userSchema.virtual('tasks' , {
    ref : 'Task',
    localField : '_id',
    foreignField : 'owner'
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id : user._id.toString() } , process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token}) //shorthand syntax for token : token
    await user.save()
    return token
}



userSchema.methods.toJSON =  function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.loginUser = async(email,password) =>{
    const user = await User.findOne({email}) //shorthand syntax for email : email cause both argument have same name

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

//Hash the plain text password before saving/after updating password
userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)

    }    

    next()
})

userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({ owner : user._id})
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User