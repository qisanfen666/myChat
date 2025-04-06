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
            roomName: ''
        }
    },
    methods:{
        joinRoom(){
            if(this.roomName.trim()){
                this.store.dispatch('joinRoom', this.roomName)
                this.roomName = ''
            } else {
                alert('Room name cannot be empty')
            }
        }
    }

})
</script>

<template>
    <div class="joinRoom">
        <input type="text" v-model="roomName" placeholder="Enter room name" />
        <button @click="joinRoom">Join Room</button>
    </div>
</template>