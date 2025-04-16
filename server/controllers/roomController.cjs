const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET_KEY = 'mySecretKey@123'
const { setUserRooms,isInRoom,createRoom,getRoom } = require('../models/roomModel.cjs')
const { getUserRooms } = require('../models/userModel.cjs')
const { saveMessage } = require('../models/messageModel.cjs')

const createRoomController = async (ctx)=>{
    const {room,password} = ctx.request.body
    try{
        console.log("room==",room)
        console.log("password==",password)
        const res = await createRoom(room,password)
        if(res){
            const defaultMessage = `Welcome to the room: ${room}`;
            await saveMessage(room, 'System', defaultMessage);   // 使用 'System' 作为默认用户
            ctx.status = 200
            ctx.body = {message: 'Room created successfully'}
        }else{
            ctx.status = 400
            ctx.body = {message: 'Room creation failed'}
        }
    }
    catch(err){
        ctx.status = 500
        ctx.body = {message:'Error creating room'}
    }
}

const joinRoomController = async (ctx)=>{
    const {username,room,password} = ctx.request.body

    if (!username || !room || !password) {
        ctx.status = 400;
        ctx.body = { message: 'room and password are required' };
        return;
    }

    try{
        const res = await isInRoom(username,room)
        const roomName = await getRoom(room)
        const isPasswordCorrect = await bcrypt.compare(password,roomName.password)
        if(!roomName){
            ctx.status = 401
            ctx.body = {message:'Room does not exist'}
            return
        }
        if(!isPasswordCorrect){
            ctx.status = 402
            ctx.body = {message:'Invalid name or password'}
            return
        }
        if(res){
            ctx.status = 400
            ctx.body = {message:'User already in room'}
            return 
        }      
        await setUserRooms(username,room)
        ctx.status = 200
        ctx.body = {message:'User added to room'} 
        
    }
    catch(err){
        ctx.status = 500
        console.log(err)
    }
}

const getUserRoomsController = (async(ctx)=>{
    const {username} = ctx.params
    try{
        console.log('Request received:', ctx.method, ctx.url);
        const rooms = await getUserRooms(username)
        console.log("name: ",username)
        ctx.status = 200
        console.log("nice:",rooms)
        ctx.body = { rooms }
    }
    catch(err){
        ctx.status = 500
        ctx.body = {message:'Error getting rooms'}
    }
})

module.exports = {
    joinRoomController,
    getUserRoomsController,
    createRoomController,
}