const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET_KEY = 'mySecretKey@123'
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
        const user = await getUser(username)

        if(!user){
            ctx.status = 400
            ctx.body = {message:'User does not exist'}
            return
        } 

        if (!user.password) {
            console.error('Password hash is missing for user:', username);
            ctx.status = 500;
            ctx.body = { message: 'Internal server error' };
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            ctx.status = 400
            ctx.body = {message:'Invalid usename or password'}
            return
        }

        const token =jwt.sign({id:user.id,username:user.username},SECRET_KEY,{expiresIn:'1h'})
        ctx.status = 200
        ctx.body = {message:'Login successful',token}
    }
    catch(err){
        console.log("error in loginUser",err)
        ctx.status = 500
        ctx.body = {message:'Internal server error'}
    }
})

module.exports = {
    registerUser,
    loginUser
}


