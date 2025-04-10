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
            store.commit('leaveRoom')
            this.joined = false
        }
    }

})
</script>

<template>

<div class="container">      
    <h2 class="header">Join Room</h2>
    <input type="text" v-model="roomName" placeholder="Enter room name" :disabled="joined"/>
    <div class="button-container">
        <button @click="joinRoom" v-if="!joined">Join Room</button>
        <button @click="leaveRoom" v-else>leave</button>
    </div>
</div>
</template>

<style scoped>
.container {
    position: relative; /* 为按钮定位提供参考 */
    padding: 20px;
    height:180px;
    background-color: #f8f8f8;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

.header {
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: bold;

}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

.button-container {
    position: absolute;
    bottom: 15px;
    right: 65px;
    display: flex;
    justify-content: flex-end;
    gap: 10px; /* 按钮之间的间距 */
}

button {
    padding: 10px 20px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: darken(#3498db, 10%);
}
</style>