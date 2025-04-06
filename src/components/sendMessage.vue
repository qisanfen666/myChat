<script>
import { useStore } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'SendMessage',

  setup(){
    const store = useStore();
    return { 
        store 
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage() {
      if (this.message.trim()) {
        const msg = {
            text:this.message,
            curRoom:this.store.state.curRoom,
        }
        console.log(msg)
        this.store.dispatch('sendMessage', msg); // 发送消息
        this.$socket.emit('sendMessage', msg); // 发送消息到服务器
        this.message = ''
      }
    },
  },
});

</script>

<template>
  <div class="send-message">
    <input type="text" v-model="message" placeholder="Type your message here..." />
    <button @click="sendMessage">Send Message</button>
  </div>
</template>