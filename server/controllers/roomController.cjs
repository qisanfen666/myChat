const { setUserRooms,isInRoom,createRoom } = require('../models/roomModel.cjs')
const { getUserRooms } = require('../models/userModel.cjs')

const createRoomController = async (ctx)=>{
    const {room} = ctx.request.body
    try{
        console.log("room==",room)
        const res = await createRoom(room)
        if(res){
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
    const {username,room} = ctx.request.body

    if (!username || !room) {
        ctx.status = 400;
        ctx.body = { message: 'Username and room are required' };
        return;
    }

    try{
        const res = await isInRoom(username,room)
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