const app = require('./app')

const port = process.env.PORT

app.listen(port,()=>{
    console.log('Serves is up on port ' + port)
})

