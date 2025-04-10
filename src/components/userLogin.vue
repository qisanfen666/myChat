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
        logout(){
            this.store.dispatch('logout')
        },
    },
});
</script>

<template>
    <h2 class="header">Login</h2>
    <div class="container">
        <input type="text" v-model="username" placeholder="username" />
        <br>
        <input type="password" v-model="password" placeholder="password" />
        <br>
        <div class="button-container">
            <button @click="userLogin">Confirm</button>
        </div>
    </div>
</template>

