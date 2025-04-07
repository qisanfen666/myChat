<script>
import axios from 'axios'
import {defineComponent} from 'vue'

export default defineComponent({
    data(){
        return {
            username:'',
            password:''
        }
    },
    methods:{
        async userLogin(){
           try{
            const response = await axios.post('/user/login',{
                username:this.username,
                password:this.password
            })
            alert(response.data.message)
           }
           catch(error){
            alert(error.response.data.message)
           }
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