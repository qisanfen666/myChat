<script>
import { defineComponent } from 'vue'
import sendMessage from './components/sendMessage.vue'
import messageList from './components/messageList.vue'
import userLogout from './components/userLogout.vue'
import joinRoom from './components/joinRoom.vue'
import userLogin from './components/userLogin.vue'
import userRegister from './components/userRegister.vue'
import leaveRoom from './components/leaveRoom.vue'
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
      joinRoom,
      leaveRoom,
      userLogin,
      userRegister,
      userLogout,
    }, 
    created(){
      this.$socket.on('connect',()=>{
        console.log('connected')
      })    
    },
    destroyed(){
      console.log('disconnected')
    },
  })
</script>

<template>
<div id="app" class="page">
  <!--左侧-->
  <div class="left-panel">
    <userRegister></userRegister>
    <br>
    <userLogin></userLogin>
  </div>

  <!--右侧-->
  <div class="right-panel">
    <div class="container">
      <joinRoom></joinRoom>
    </div>
    <div class="container">
      <h2 class="head">Chat Room</h2>
      <div class="message-box">
        <messageList></messageList>
      </div>
      <div class="send-message">
        <sendMessage></sendMessage>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss">
@import './assets/page.scss';
@import './assets/base.scss';
</style>