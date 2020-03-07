require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5e5dca7e0d5fe71930d3d3aa', { age : 25}).then((user) => {
    console.log(user)
    return User.countDocuments({ age : 25})
}).then((result) =>{
    console.log(result)
}).catch((e) =>{
    console.log(e)
})