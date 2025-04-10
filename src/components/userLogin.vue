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
            password:'',
            flag:false
        }
    },
    methods:{
        userLogin(){
           this.store.dispatch('login',{
               username:this.username,
               password:this.password,   
           })
           this.flag=true
        },
        logout(){
            this.store.dispatch('logout')
            this.flag=false
            this.username='',
            this.password='',
            this.store.dispatch('leaveRoom')
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
            <button @click="userLogin" v-if="!flag">Confirm</button>
            <button @click="logout" v-else>log out</button>
        </div>
    </div>
</template>

