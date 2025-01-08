<template>
    <v-container class="text-center mt-16">
        <v-row justify="center" align="center" class="mt-16">
            <v-col cols="4" align="center">
                <div class="text-h1 text-indigo-lighten-4 ephesis-regular">RegulArt</div>
                <v-text-field class="mt-4" label="Search" density="compact" hide-details single-line append-inner-icon="mdi-magnify" v-model="text" @keyup.enter="search"></v-text-field>
                <div class="ma-4">
                    <RouterLink to="/posts"><v-btn>Posts</v-btn></RouterLink>
                </div>
                <div class="ma-4">
                    <RouterLink v-if="false" to="/profile"><v-btn append-icon="mdi-account-circle" class="ma-4">Username</v-btn></RouterLink>
                    <RouterLink v-if="true" to="/login"><v-btn class="ma-4">Login</v-btn></RouterLink>
                    <RouterLink v-if="false" to="/admin"><v-btn class="ma-4">Admin</v-btn></RouterLink>
                </div>
            </v-col>
        </v-row>
    </v-container>
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