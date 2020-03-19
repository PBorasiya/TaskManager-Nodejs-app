const auth = async (req, res, next) =>{
    console.log('testing for middleware')
    next()
}

// app.use((req,res,next) =>{
//     if(req.method =='GET'){
//         res.send('GET requests are disabled for time being')
//     }else{
//         next()
//     }
// })

// app.use((req,res,next) =>{
//     res.status(503).send('Site temporarily under maintainance. Please try back again later')
// })

module.exports = auth