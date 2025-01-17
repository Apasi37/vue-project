<template>
    <v-textarea clearable counter label="Comment" v-model="commentText" @click="comment(commentText)"></v-textarea>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data(){
        return{
            commentText: "",
        }
    },
    methods:{
        comment(commentText: string){

        }
    },
})
</script>