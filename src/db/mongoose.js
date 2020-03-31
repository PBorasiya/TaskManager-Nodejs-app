const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL.toString(),{
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology: true,
    useFindAndModify : false
})


