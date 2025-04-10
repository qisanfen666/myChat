<script>
import { defineComponent } from 'vue'
import sendMessage from './components/sendMessage.vue'
import messageList from './components/messageList.vue'
import userLogout from './components/userLogout.vue'
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
      joinRoom,
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
    <div class="container">
      <userRegister></userRegister>
    </div>
    <br>
    <div class="container">
      <userLogin></userLogin>
    </div>
    <br>
    <div class="container">
      <joinRoom></joinRoom>
    </div>
  </div>

  <!--右侧-->
  <div class="right-panel">
    <h2 class="head">Chat Room</h2>
    <div class="message-box chat-container">
      <messageList></messageList>
    </div>
    <div class="send-message">
      <sendMessage></sendMessage>
    </div>
  </div>
</div>
</template>

<style lang="scss">
@import './assets/page.scss';
@import './assets/base.scss';
</style>