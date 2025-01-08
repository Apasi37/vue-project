<template>
    <v-toolbar class="position-fixed top-0 left-0 right-0 bg-blue-grey-darken-1 " style="z-index: 2001;">
        <RouterLink to="/" style="text-decoration: none;"><div class="text-h3 text-indigo-lighten-4 ephesis-regular ml-2">RegulArt</div></RouterLink>
        <v-spacer></v-spacer>
        <v-text-field label="Search" density="compact" hide-details single-line append-inner-icon="mdi-magnify" v-model="text" @keyup.enter="search"></v-text-field>
        <v-spacer></v-spacer>
        <RouterLink v-if="true" to="/profile"><v-btn append-icon="mdi-account-circle" class="ma-4">Username</v-btn></RouterLink>
    </v-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data(){
        return{
            text: ""
        }
    },
    methods:{
        search(){
            this.$router.push({ path: '/posts', query: { search: this.text }})
        },
    },
})
</script>