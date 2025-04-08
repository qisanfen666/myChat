<script>
import { useStore } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
    name:'userLogin',
    setup(){
        const store = useStore()
        return {
            store
        }
    },
    data(){
        return {
            username:'',
            password:''
        }
    },
    methods:{
        async userLogin(){
           await this.store.dispatch('login',{
               username:this.username,
               password:this.password
           })
        },
    },
});
</script>

<template>
    <div>
        <h2 class="head">Login</h2>
        <input type="text" v-model="username" placeholder="username" />
        <input type="password" v-model="password" placeholder="password" />
        <button @click="userLogin">Login</button>
    </div>
</template>