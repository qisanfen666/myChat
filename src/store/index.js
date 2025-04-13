import {createStore} from 'vuex'
import io from 'socket.io-client'
import axios from 'axios'

const socket = io('http://localhost:3000')

const store = createStore({
    state:{
        socketConnected:false,
        curRoomUserCount:0,
        rooms:[],
        messages:[],
        curRoom:'Hall',
        user:null,
        token:null,
    },

    mutations:{
        socketConnected(state){
            state.socketConnected = true
        },
        socketDisConnected(state){
            state.socketConnected = false
        },
        setRoomUsers(state,roomUsers){
            state.curRoomUserCount = roomUsers
        },
        setMessages(state,messages){
            if(messages.length==0){
                state.messages = []
                return
            }
            if(Array.isArray(messages)){
                state.messages = messages
            }
            else{
                //这个...语法是ES6的扩展运算符，用于展开数组或对象
                //这里是将新的消息添加到现有的消息数组中
                //创建一个新数组，包含现有的消息和新的消息，并赋值给state.messages
                state.messages = [...state.messages, messages]; // 创建新数组，追加新消息
            }
            //console.log(message.text)
            //console.log(state.messages)
        },
        setCurRoom(state,curRoom){
            state.curRoom = curRoom
        },
        setRooms(state,rooms){
            state.rooms = rooms
        },
        setToken(state,token){
            state.token = token
        },
        setUser(state,user){
            state.user = user
        },
        clearUser(state){
            state.user = null
            state.token = null
        },
    },
    //actions由前端组件调用
    //socket.emit()用于向服务器发送消息
    actions: {
        async login({commit,state},{username,password}){
            try{
                const response = await axios.post('/user/login',{username,password})
                if(response.status==400){
                    alert('User does not exist')
                    return
                }
                if(response.data.token){
                    const token = response.data.token
                    const user = {
                        username:username,
                        password:password,
                    }
                    localStorage.setItem('token',token)
                    //const response2 = await axios.get('/room',username)
                    //console.log('is  ',response2.data.rooms)
                    commit('setUser',user)
                    commit('setToken',token)
                    commit('setCurRoom','Hall')
                    commit('setRooms',response.data.rooms)
                    socket.auth = {authorization: `Bearer ${token}`}
                    socket.connect()
                    alert('login success')
                    console.log(`${state.user.username} login`)
                }
            }
            catch(error){
                console.error('Login error:', error.response?.data || error.message);
                alert(error.response?.data?.message || 'Login failed');
            }
        },
        logout({commit,state}){
            console.log(`${state.user.username} logout`)
            socket.disconnect()
            localStorage.removeItem('token')
            commit('clearUser')
            commit('setRooms',[])
            alert('log out success')
        },
        async createRoom({commit,state},room){
            try{
                const res = await axios.post('/room/create',{room})
                if(res){
                    console.log('Room created successfully')
                    this.joinRoom({commit,state},res.data.room)
                    const response = await axios.get(`/room/${state.user.username}`)
                    commit('setRooms',response.data.rooms) 
                }
                else{
                    console.log('Room creation failed')
                }
            }
            catch(error){
                console.log(error)
            }
        },
        async joinRoom({commit,state},room){
            try{
                if(!room||room.trim()==''){
                    console.log('room name is empty')
                    return
                }
                await axios.post('/room/join',{username:state.user.username,room})
                const response = await axios.get(`/room/${state.user.username}`)
                    commit('setRooms',response.data.rooms)  
            }      
            catch(error){
                console.log(error)
            }         
        },
        async chooseRoom({commit,state},room){
            socket.emit('leaveRoom',state.curRoom)
            console.log(`Left room:${state.curRoom}`)
            console.log(`Joining room:${room}`)
    
            socket.emit('joinRoom',room,async ()=>{
                console.log(`Joined room:${room}`)    
            })

            const response = await axios.get(`/messages/${room}`)
            //console.log(response.data.messages)
            commit('setCurRoom',room)
            commit('setMessages',response.data.messages)  
        },
        leaveRoom({commit,state},room){
            socket.emit('leaveRoom',room)
            console.log(`Left room:${room}`)
            commit('setCurRoom','Hall')
            commit('setMessages',[])
        },
        sendMessage({state},msg){
            if(!state.user){
                alert('Please login first')
                return
            }
            if(!msg||msg.trim()==''){
                alert('message is empty')
                return 
            }
            const message = {
                text:msg,
                curRoom:state.curRoom,
                user:state.user.username,
                timestamp:new Date().toLocaleString()
            }

            axios.post(`/messages`,message)

            socket.emit('sendMessage',message)
        },
        socketConnected({commit}){
            commit('socketConnected',true)
        },
        disConnected({commit}){
            socket.disconnect()
            commit('socketDisConnected',false)
        }
    },
})

//socket.on()用于接收服务器发送的消息
//store.commit()用于更新Vuex状态
socket.on('connect',()=>{
    store.commit('socketConnected')
})

socket.on('disConnect',()=>{
    store.commit('socketDisConnected')
    store.commit('setId',null)
})

socket.on('joinRoom',(room)=>{
    store.commit('joinRoom',room)
})

socket.on('sendMessage',(msg)=>{
    store.commit('setMessages',msg)
})

export default store