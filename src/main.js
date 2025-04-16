import App from './App.vue'
import io from 'socket.io-client'
import axios from 'axios'
import {createApp} from 'vue'
import store from './store'
//import { config } from '../server/utils/db.cjs'

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use((config)=>{
    if(store.state.token){
        config.headers.Authorization = `Bearer ${store.state.token}`
    }
    return config
},error=>{
    return Promise.reject(error)

})

const app = createApp(App)

app.use(store)

const socket = io('http://localhost:3000',{
    transports: ['websocket'],
    autoConnect: false,
})

const token = localStorage.getItem('token'); // 从 localStorage 获取 token
if (token) {
    socket.auth = { authorization: `Bearer ${token}` }; // 设置认证信息
} else {
    console.error('No token found in localStorage');
}

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')   // 从 localStorage 获取 token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

//设置全局变量
app.config.globalProperties.$socket = socket

socket.on('connect',()=>{
    console.log('Connected to server')
    store.commit('socketConnected')
})

socket.on('disconnect',()=>{
    console.log('Disconnected from server')
    store.commit('socketDisConnected')
})

app.mount('#app')
