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
        }
    },

    methods:{
        createRoom(){
            if(this.roomName.trim()){
                this.store.dispatch('createRoom', this.roomName)         
                this.roomName = ''
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
        <div class="button-container">
            <button @click="createRoom">Confrim</button>
        </div>
    </div>
</template>