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
            roomPassword: '',
            joined: false
        }
    },
    methods:{
        joinRoom(){
            if(this.roomName.trim()&&this.roomPassword.trim()){
                this.store.dispatch('joinRoom', {room:this.roomName,password:this.roomPassword})         
                this.roomName = ''
                this.roomPassword = ''
            } else {
                alert('Room name cannot be empty')
            }
        },
        // leaveRoom(){
        //     this.store.dispatch('leaveRoom')
        //     this.joined = false
        // }
    }

})
</script>

<template>
<h2 class="header">Join Room</h2>
<div class="container">       
    <input type="text" v-model="roomName" placeholder="Enter room name" />
    <input type="password" v-model="roomPassword" placeholder="Enter room password" />
    <div class="button-container">
        <button @click="joinRoom" >Join Room</button>

    </div>
</div>
</template>

