const jwt = require('jsonwebtoken')
const SECRET_KEY = 'mySecretKey@123'

const authenticate = (async (ctx, next)=>{
    const header =ctx.headers.authorization
    const token =header.split(' ')[1]
    if(!header||!token){
        ctx.status = 401
        ctx.body = {message:'Authorization token is required'}
        return
    }

    try{
        const decoded = jwt.verify(token,SECRET_KEY)
        ctx.state.user =decoded
        await next()
    }
    catch(err){
        ctx.status = 401
        ctx.body = {message:'Invalid token'}
    }
})

module.exports = {
    authenticate
}