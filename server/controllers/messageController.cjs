const { saveMessage, getMessagesByRoom } = require('../models/messageModel.cjs')

//保存消息到数据库
const saveMessageConttoller = async(ctx)=>{
    const {curRoom,user,text} = ctx.request.body
    try{
        await saveMessage(curRoom,user,text)
        ctx.status = 200
        ctx.body = {message:'Message saved successfully'}
    }
    catch(err){
        ctx.status = 500
        ctx.body = {message:'Error saving message'}
    }
}

//获取指定房间的消息
const getMessagesByRoomController = async(ctx)=>{
    const {room} = ctx.params
    try{
        const messages = await getMessagesByRoom(room)
        ctx.status = 200
        console.log(messages)
        //console.log(messages)
        ctx.body = {messages}
    }
    catch(err){
        ctx.status = 500
        ctx.body = {message:'Error getting messages'}
    }
}

module.exports = {
    saveMessageConttoller,
    getMessagesByRoomController
}