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
                //如果用户不存在，返回400错误
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
                    commit('setUser',user)
                    commit('setToken',token)
                    commit('setCurRoom','Hall')
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
            alert('log out success')
        },
        async joinRoom({commit,state},room){
            if(!room||room.trim()==''){
                console.log('room name is empty')
                return
            }
            if(state.curRoom){
                socket.emit('leaveRoom',state.curRoom)
                console.log(`Left room:${state.curRoom}`)
            }

            socket.emit('joinRoom',room,async ()=>{
                console.log(`Joined room:${room}`)    
            })

            const response = await axios.get(`/messages/${room}`)
            //console.log(response.data.messages)
            commit('setCurRoom',room)
            commit('setMessages',response.data.messages)        
        },
        leaveRoom({commit,state}){
            socket.emit('leaveRoom',state.curRoom)
            console.log(`Left room:${state.curRoom}`)
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

socket.on('leaveRoom',()=>{
    store.commit('setRooms','')
})

socket.on('sendMessage',(msg)=>{
    store.commit('setMessages',msg)
})

export default store