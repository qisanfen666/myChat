<script>
import { useStore } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
    name:'joinRoom',
    
    setup(){
        const store = useStore()
        return {
            store
        }
    },
    data(){
        return {
            roomName: '',
            joined: false
        }
    },
    methods:{
        joinRoom(){
            if(this.roomName.trim()){
                this.store.dispatch('joinRoom', this.roomName)         
                this.joined = true  
                this.roomName = ''
            } else {
                alert('Room name cannot be empty')
            }
        },
        leaveRoom(){
            this.store.dispatch('leaveRoom')
            this.joined = false
        }
    }

})
</script>

<template>
<h2 class="header">Join Room</h2>
<div class="container">       
    <input type="text" v-model="roomName" placeholder="Enter room name" :disabled="joined"/>
    <div class="button-container">
        <button @click="joinRoom" v-if="!joined">Join Room</button>
        <button @click="leaveRoom" v-else>leave</button>
    </div>
</div>
</template>

