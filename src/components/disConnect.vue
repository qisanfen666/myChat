<script>
import {useStore} from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
    name:'disConnect',
    setup(){
        const store = useStore()
        return {
            store
        }
    },
    methods:{
        disConnect(){   
            this.$socket.disconnect()
            this.store.dispatch('disConnected')
        }   
    }
})

</script>

<template>
    <div class="disConnect">
        <button @click="disConnect">disConnect</button>
    </div>
</template>