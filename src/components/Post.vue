<template>
    <RouterLink :to="'posts/'+id">
        <v-img :src="src" width="300" max-height="300"></v-img>
    </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props:{
        id: Number,
        src: String
    }
})
</script>