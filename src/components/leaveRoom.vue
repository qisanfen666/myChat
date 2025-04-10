<script>
import { useStore } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
    name:'leaveRoom',

    setup(){
        const store =useStore()
        return {
            store
        }
    },

    methods:{
        leaveRoom(){
            store.commit('leaveRoom')
        }
    }
})

</script>

<template>
    <div class="button-container">
        <button @click="leaveRoom">return</button>
    </div>
</template>