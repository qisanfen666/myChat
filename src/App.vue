<script>
import { defineComponent } from 'vue'
import sendMessage from './components/sendMessage.vue'
import messageList from './components/messageList.vue'
import disConnect from './components/disConnect.vue'
import connect from './components/connect.vue'
import joinRoom from './components/joinRoom.vue'
import userLogin from './components/userLogin.vue'
import userRegister from './components/userRegister.vue'
import { useStore } from 'vuex'

  export default defineComponent({
    name: 'App',
    setup(){
      const store = useStore()
      return { 
        store 
      }
    },
    components:{
      messageList,
      sendMessage,
      disConnect,
      connect,
      joinRoom,
      userLogin,
      userRegister,
    }, 
    created(){
      this.$socket.on('connect',()=>{
        console.log('connected')
      })
      //默认加入房间
      this.$socket.emit('joinRoom', 'Hall')
    },
    destroyed(){
      console.log('disconnected')
    },
  })
</script>

<template>
<div id="app">
  <header>
    <h1>MyChat</h1>
  </header>
  <main>
    <userRegister></userRegister>
    <userLogin></userLogin>
    <div class="container">
      <sendMessage></sendMessage>
    </div>
    <span></span>
    <div class="container">
      <joinRoom></joinRoom>
    </div>
    <div class="container">
      <messageList></messageList>
    </div>
    <div class="options">
      <connect></connect><span></span><disConnect></disConnect>
    </div>
  </main>
  <footer>
  </footer>
</div>
</template>