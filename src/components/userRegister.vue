<script>
import axios from 'axios'
import {defineComponent} from 'vue'

export default defineComponent({
    data(){
        return{
            username:'',
            password:'',
            _password:''
        }
    },
    methods:{
        async userRegister(){
            try{
                if(this.password==this._password){
                    const response = await axios.post('/user/register',{
                    username:this.username,
                    password:this.password
                })
                alert(response.data.message)
                }
                else{
                    alert('两次密码不一致')
                }
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
        <h2 class="head">Register</h2>
        <div class="container">
            <input type="text" v-model="username" placeholder="Enter your user name"/>
            <input type="password" v-model="password" placeholder="Enter your password"/>
            <input type="password" v-model="_password" placeholder="Enter your password again">
            <button @click="userRegister">confirm</button>
        </div>
    </div>
</template>