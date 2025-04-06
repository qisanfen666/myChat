const koa = require('koa')
const http = require('http')
const cors = require('@koa/cors')
const socketIo = require('socket.io')

//http://localhost:5173
let hostname= '127.0.0.1'
let port = 3000
let app = new koa()

app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST'],
    exposeHeaders: ['X-Total-Count'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

const server = http.createServer(app.callback())

const io = socketIo(server,{
    cors:{
        origin: '*',
        allowMethods: ['GET', 'POST'],
        exposeHeaders: ['X-Total-Count'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }
})

io.on('connection',socket=>{
    console.log("http://localhost:5173")
    const userId = socket.handshake.auth.userId  //获取用户id
    socket.userId = userId  //将用户id存储在socket对象中
    console.log(`User connected:${socket.userId}`)

    socket.on('disconnect',()=>{
        console.log(`User disconnected:${socket.userId}`)
        socket.emit('disConnect')  //向客户端发送断开连接的消息
    })

    socket.on('sendMessage',(msg)=>{
        console.log(`${socket.userId} send ${msg.text} to ${msg.curRoom}`)
        io.to(msg.curRoom).emit('sendMessage',msg)  
    })

    socket.on('joinRoom',room=>{
        if(!room) {
            console.error('Room name is required')
            return
        }
        socket.join(room)
        console.log(`User ${socket.userId} joined room ${room}`)
        socket.to(room).emit('joinRoom',room,socket.userId)  
    })

    socket.on('leaveRoom',()=>{
        console.log(`User ${socket.userId} left room ${room}`)
        socket.to(room).emit('leaveRoom')
    })

    socket.on('error',error=>{
        console.error('Socket error:',error)
        socket.emit('error',error)
    })

})

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
})

