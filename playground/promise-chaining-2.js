require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e585c6705a9c721ec52edc6', {}).then((task) =>{
//     console.log(task)
//     return Task.countDocuments({ completed : true})
// }).then((result) =>{
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteByIdandCount = async(id) =>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed : true})
    return count
}

deleteByIdandCount('5e5f0e44a8051b43d098353b').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})