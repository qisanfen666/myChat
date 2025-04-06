import {createStore} from 'vuex'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

const store = createStore({
    state:{
        socketConnected:false,
        socketId:null,
        rooms:[],
        messages:[],
        curRoom:'Hall',
    },

    mutations:{
        socketConnected(state){
            state.socketConnected = true
            console.log(`${state.socketId} connected`)
        },
        socketDisConnected(state){
            state.socketConnected = false
        },
        setId(state,id){
            state.socketId = id
        },
        setRooms(state,room){
            state.rooms.push(room)
        },
        setMessages(state,message){
            if(state.messages.push(message)){
                console.log("OKOKOk")
            }
            //console.log(message.text)
            //console.log(state.messages)
        },
        setCurRoom(state,curRoom){
            state.curRoom = curRoom
        },
    },
    //actions由前端组件调用
    //socket.emit()用于向服务器发送消息
    actions: {
        joinRoom({commit},room){
            if(!room||room.trim()==''){
                console.log('room name is empty')
                return
            }
            socket.emit('joinRoom',room,()=>{
                console.log('join room success')
            })
            commit('setCurRoom',room)
            commit('setRooms',room)
        },
        leaveRoom({commit},room){
            socket.emit('leaveRoom',room)
            commit('setCurRoom',null)
        },
        setId({commit},id){
            commit('setId',id)
        },
        sendMessage({state},msg){
            socket.emit('sendMessage',msg,state.curRoom)
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

socket.on('setId',(id)=>{
    store.commit('setId',id)
})

socket.on('joinRoom',(room)=>{
    store.commit('joinRoom',room)
    store.commit('setRooms',room)
})

socket.on('leaveRoom',()=>{
    store.commit('setRooms','')
})

socket.on('sendMessage',(msg)=>{
    store.commit('setMessages',msg)
})

export default store