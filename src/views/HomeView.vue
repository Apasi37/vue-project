<template>
    <v-container class="text-center mt-16">
        <v-row justify="center" align="center" class="mt-16">
            <v-col cols="4" align="center">
                <div class="text-h1 text-indigo-lighten-4 ephesis-regular">RegulArt</div>
                <SearchBar class="mt-10"></SearchBar>
                <div class="ma-4">
                    <RouterLink to="/posts"><v-btn>Posts</v-btn></RouterLink>
                </div>
                <div class="ma-4">
                    <v-btn append-icon="mdi-account-circle" class="ma-4">{{user.name}}</v-btn>
                    <RouterLink v-if="!user.loggedIn" to="/login"><v-btn class="ma-4">Login</v-btn></RouterLink>
                    <RouterLink v-if="user.role == 'admin'" to="/admin"><v-btn class="ma-4">Admin Panel</v-btn></RouterLink>
                </div>
                <v-btn v-if="user.role == 'admin'" @click="clearStorage">clear storage</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { useUserStore } from '../stores/user'
import SearchBar from '../components/SearchBar.vue';

import { defineComponent } from 'vue';
export default defineComponent({
    components:{
        SearchBar
    },
    data(){
        return{
            user: useUserStore(),
        }
    },
    methods:{
        clearStorage(){
            localStorage.clear();
        }
    }
})
</script>