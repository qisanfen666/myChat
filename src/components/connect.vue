<script>
import {useStore} from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
    name:'connect',
    setup(){
        const store = useStore()
        return {
            store
        }
    },
    data(){
        return {
            userId: ''
        }
    },
    methods:{
        connect(){
            if(this.userId.trim()){
                this.store.dispatch('setId', this.userId) // 设置用户ID
                this.store.dispatch('socketConnected')  // 调用mutation
                
                this.$socket.auth = {
                    userId: this.userId
                }
                //作用是为了在连接成功后，向服务器发送一个事件，告诉服务器当前用户的ID
                this.$socket.connect()
            } else {
                alert('User ID cannot be empty')
            }
        },
        test(){
            console.log(`I am ${this.userId}`)
        }
    }
})

</script>

<template>
    <div class="connect">
        <input type="text" v-model="userId" placeholder="Enter your user ID" />
        <br>
        <button @click="connect">connect</button>
        <button @click="test">test</button>
    </div>
</template>