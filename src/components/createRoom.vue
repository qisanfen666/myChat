<script>
import { useStore } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
    name:'createRoom',

    setup(){
        const store = useStore()
        return {
            store
        }
    },

    data(){
        return{
            roomName: '',
            roomPassword: '',
        }
    },

    methods:{
        createRoom(){
            if(this.roomName.trim()&&this.roomPassword.trim()){
                console.log(this.roomName,this.roomPassword)
                this.store.dispatch('createRoom', {room:this.roomName,password:this.roomPassword})         
                this.roomName = ''
                this.roomPassword = ''
            } else {
                alert('Room name cannot be empty')
            }
        }
    },
})
</script>

<template>
    <h2 class="header">Create Room</h2>
    <div class="container">       
        <input type="text" v-model="roomName" placeholder="Enter room name" />
        <input type="password" v-model="roomPassword" placeholder="Enter room password" />
        <div class="button-container">
            <button @click="createRoom">Confrim</button>
        </div>
    </div>
</template>