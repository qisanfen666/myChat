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

    },
})
</script>

<template>
    <div>Room : {{ curRoom }}</div>
    <ul class="messagelist">
        <li v-for="(message, index) in messages" :key="index" v-if="message.curRoom === curRoom.value">
            {{ message.user }} : {{ message.text }}
            <span>({{ message.timestamp }})</span>
        </li>
    </ul>
</template> 