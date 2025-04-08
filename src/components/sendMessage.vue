<script>
import { useStore } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent ({
    name:'sendMessage',

    setup(){
      const store = useStore()
      return {
        store
      }
    },

    data(){
      return {
        message:'',
      }
    },

    methods:{
      sendMessage(){
        if(this.message.trim() !== ''){
          this.store.dispatch('sendMessage', this.message)
          this.message = ''
        }
        else{
          alert('Message cannot be empty')
        }
      }
    }
})

</script>

<template>
  <div class="send-message">
    <input type="text" v-model="message" placeholder="Type your message here..." />
    <button @click="sendMessage">Send Message</button>
  </div>
</template>