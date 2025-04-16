const koa = require('koa')
const http = require('http')
const cors = require('@koa/cors')
const {bodyParser} = require('@koa/bodyparser')
const userRouters = require('./routers/userRouters.cjs')
const messageRouters = require('./routers/messageRouters.cjs')
const roomRouters = require('./routers/roomRouters.cjs')
const socketIo = require('socket.io')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'mySecretKey@123'

//http://localhost:5173
const hostname= '127.0.0.1'
const port = 3000
const app = new koa()

app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST'],
    exposeHeaders: ['X-Total-Count'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(bodyParser())

//挂载路由
//allowedMethods是允许客户端发送请求的方法，这里设置为GET和POST
app.use(userRouters.routes()).use(userRouters.allowedMethods())
app.use(messageRouters.routes()).use(messageRouters.allowedMethods())
app.use(roomRouters.routes()).use(roomRouters.allowedMethods())

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
    //token验证
    const authHeader = socket.handshake.auth.authorization
    if(!authHeader){
        socket.disconnect()
        return
    }
    else{
        console.log('Token is valid')
    }

    const token = authHeader.split(' ')[1]; // 提取 Bearer 后的实际 token
    if (!token) {
        console.error('Invalid token format');
        socket.disconnect();
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        socket.userId = decoded.username
        console.log(`User connected: ${socket.userId}`)
    } catch (error) {
        console.error('Invalid token:', error)
        socket.disconnect()
        return
    }

    socket.on('disconnect',()=>{
        console.log(`User disconnected:${socket.userId}`)
    })

    socket.on('sendMessage',(msg)=>{
        if (!socket.userId) {
            console.error('Unauthorized user tried to send a message');
            socket.emit('error', { message: 'Unauthorized' });
            return;
        }

        if(!msg.curRoom || !msg.text){
            console.error('Invalid message format')
            return
        }

        console.log(`${socket.userId} sent message: ${msg.text} in room ${msg.curRoom}`)
        io.to(msg.curRoom).emit('sendMessage',msg)
    })

    socket.on('joinRoom',room=>{
        if(!room) {
            console.error('Room name is required')
            return
        }
        socket.join(room)
        console.log(`User ${socket.userId} joined room ${room}`)

        const usersInRoom = Array.from(io.sockets.adapter.rooms.get(room) || []).map(
            (socketId) => io.sockets.sockets.get(socketId).userId
        )

        io.to(room).emit('roomUsers',{room,users:usersInRoom})
    })

    socket.on('leaveRoom',(room)=>{
        if(!room){
            console.error('Room name is required')
            return
        }
        
        socket.leave(room)
        console.log(`User ${socket.userId} left room ${room}`)

        const usersInRoom = Array.from(io.sockets.adapter.rooms.get(room) || []).map(
            (socketId) => io.sockets.sockets.get(socketId).userId
        )

        io.to(room).emit('leaveRoom',room,socket.userId,usersInRoom)
    })

    socket.on('error',error=>{
        console.error('Socket error:',error)
        socket.emit('error',error)
    })

})

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
    console.log("PageURL: http://localhost:5173")
})

