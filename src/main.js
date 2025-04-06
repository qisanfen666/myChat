import App from './App.vue'
import io from 'socket.io-client'
import axios from 'axios'
import {createApp} from 'vue'
import store from './store'

axios.defaults.baseURL = 'http://localhost:3000'

const app = createApp(App)

app.use(store)

const socket = io('http://localhost:3000',{
    transports: ['websocket'],
    autoConnect: false,
})

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
