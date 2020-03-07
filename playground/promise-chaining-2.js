require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5e585c6705a9c721ec52edc6', {}).then((task) =>{
    console.log(task)
    return Task.countDocuments({ completed : true})
}).then((result) =>{
    console.log(result)
}).catch((e) => {
    console.log(e)
})