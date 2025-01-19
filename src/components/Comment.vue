<template>
    <v-col cols="11" >
        <v-card class="bg-blue-grey-lighten-1"
            :title="comment.user"
            :subtitle="comment.date"
            :text="comment.comment"
        ></v-card>
    </v-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        comment:{
            type: Object,
            default: () => ({}) 
        }
    }
})
</script>