<script>
import { defineComponent,computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    //可进入的聊天室的列表
    name: 'chatList',   

    setup(){
        const store = useStore()
        const rooms = computed(()=>store.state.rooms)
        const curRoom = computed(()=>store.state.curRoom)
               
        return {
            store,
            rooms,
            curRoom,
        }
    },
    //当前聊天室强调显示样式
    methods:{
        async chooseRoom(room){
            this.store.dispatch('chooseRoom',room)
        }
    }
})
</script>

<template>
    <h2 class="header">Chat List</h2>
    <ul class="list-item">
        <li  class="list-item-option" v-for="(room, index) in rooms" :key="index" @click="chooseRoom
        (room)" :class="{'current-room': room === curRoom}">
            {{ room }}
        </li>
    </ul>
</template>

