const jwt = require('jsonwebtoken')
const SECRET_KEY = 'mySecretKey@123'


//中间件函数，用于验证用户身份
const authenticate = (async (ctx, next)=>{
    const header =ctx.headers.authorization
    const token =header.split(' ')[1]
    if (!header) {
        ctx.status = 401;
        ctx.body = { message: 'Authorization header is required' };
        return;
    }

    if(!token){
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
        console.error('Invalid token:', err)
        ctx.body = {message:'Invalid token'}
    }
})

module.exports = {
    authenticate
}