<template>
    <v-text-field label="Search" density="compact" hide-details append-inner-icon="mdi-magnify" v-model="text" @keyup.enter="search(text)" @click:append-inner="search(text)"></v-text-field>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data(){
        return{
            text: "",
        }
    },
    methods:{
        search(text: string){
            this.$router.push({ path: '/posts', query: { page: 1, search: text }})
        },
    },
})
</script>