<script>
import { useStore } from 'vuex'
import { computed,onMounted,ref,watch,nextTick } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
    //消息列表
    name:'MessageList',

    setup(){
        const store = useStore()
        const messages = computed(() => store.state.messages)
        const curRoom = computed(() => store.state.curRoom)
        //const autoScroll = ref(true) // 是否自动滚动
        const messageListRef = ref(null) // 引用消息列表的 DOM 元素

        // 滚动到最底部
        const scrollToBottom =() => {
            nextTick(()=>{
                if(messageListRef.value){
                    messageListRef.value.scrollTop = messageListRef.value.scrollHeight
                }
            })
        }

        // const handleScroll = () => {
        //     const {scrollTop, scrollHeight, clientHeight } = messageListRef.value
        //     if(scrollTop + clientHeight < scrollHeight ){
        //         autoScroll.value = false
        //     }
        //     else{
        //         autoScroll.value = true
        //     }         
        // }

        // 初次加载时滚动到底部
        onMounted(() => {
            scrollToBottom()
            console.log('mounted')
        })

        // 监听消息列表的变化
        watch(messages,() =>{
            scrollToBottom()
            console.log('messages changed')
        })

        return { 
            messages,
            curRoom,
            messageListRef,
            store,
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
    <ul ref="messageListRef" style="overflow-y:auto">
        <li v-for="(message, index) in messages" 
        :key="index" 
        v-if="message.curRoom === curRoom.value"
        :class="['chat-bubble', message.user === this.store.state.user.username ? 'user' : 'bot']"
        >
            {{ message.user }} : {{ message.text }}
            <span>({{ message.timestamp }})</span>
        </li>
    </ul>
</template> 