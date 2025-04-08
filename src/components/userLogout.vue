<script>
import {useStore} from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
    name:'userLogout',
    setup(){
        const store = useStore()
        return {
            store
        }
    },
    methods:{
        logout(){
            this.store.dispatch('logout')
        }
    }
})

</script>

<template>
    <div class="logout">
        <button @click="logout">Log out</button>
    </div>
</template>