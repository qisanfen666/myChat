<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name:'MessageList',

    setup(){
        const store = useStore()
        const messages = computed(() => store.state.messages)
        const curRoom = computed(() => store.state.curRoom)
        return { 
            messages,
            curRoom
        }
    },
    data() {
        return {
            message: ''
        }
    },
    methods: {
        test() {
            for(let i=0;i<this.messages.length;i++){
                console.log(this.messages[i])
            }
            console.log(this.messages)
            console.log(`curroom is ${this.curRoom}`)
        },
    },
})
</script>

<template>
    <button @click="test">test</button>
    <div>Room : {{ curRoom }}</div>
    <br>
    <ul class="messageList">
        <li v-for="(message, index) in messages" :key="index">
            {{ message.user }} : {{ message.text }}
            <span>{{ message.timestamp }}</span>
        </li>
    </ul>
</template> 