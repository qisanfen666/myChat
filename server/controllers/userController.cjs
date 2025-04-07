const {createUser,getUser} = require('../models/userModel.cjs')

const registerUser = (async ctx=>{
    const {username,password} = ctx.request.body

    try{
        const existingUser =await getUser(username)
        if(existingUser){
            ctx.status = 400
            ctx.body = {message:'User already exists'}
            return
        }
        await createUser(username,password)
        ctx.status = 201
        ctx.body = {message:'User created successfully'}
    }
    catch(error){
        ctx.status = 500
        ctx.body = {message:'Internal server error'}
    }
})

const loginUser = (async ctx=>{
    const {username,password} = ctx.request.body
    try{
        const existingUser = await getUser(username)
        if(!existingUser){
            ctx.status = 400
            ctx.body = {message:'User does not exist'}
            return
        } 
        const isPasswordCorrect = await bcrypt.compare(username,existingUser.password)
        if(!isPasswordCorrect){
            ctx.status = 400
            ctx.body = {message:'Invalid usename or password'}
            return
        }
        ctx.body = {message:'Login successful',user:existingUser}
        ctx.status = 200
    }
    catch(err){
        ctx.status = 500
        ctx.body = {message:'Internal server error'}
    }
})

module.exports = {
    registerUser,
    loginUser
}


