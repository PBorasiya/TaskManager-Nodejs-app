require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5e5dca7e0d5fe71930d3d3aa', { age : 25}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age : 25})
// }).then((result) =>{
//     console.log(result)
// }).catch((e) =>{
//     console.log(e)
// })

const updateAgeAndCount = async (id , age ) =>{
    const user = await User.findByIdAndUpdate( id, {age})
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5e5dca7e0d5fe71930d3d3aa', 24 ).then((count) =>{
    console.log(count)
}).catch((e) =>{
    console.log(e)
})