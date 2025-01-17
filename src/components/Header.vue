<template>
    <div class="position-fixed top-0 left-0 right-0 bg-blue-grey-darken-1" style="z-index: 2001;">
        <v-toolbar>
            <div @click="toggleSideBar">IMG</div>
            <RouterLink to="/" style="text-decoration: none;"><div class="text-h3 text-indigo-lighten-4 ephesis-regular ml-2">RegulArt</div></RouterLink>
            <v-spacer></v-spacer>
            <SearchBar></SearchBar>
            <v-spacer></v-spacer>
            <v-btn append-icon="mdi-account-circle" class="ma-4" v-if="user.loggedIn" @click="toggleProfile">{{user.name}}</v-btn>
            <RouterLink v-if="!user.loggedIn" to="/login"><v-btn class="ma-4">Login</v-btn></RouterLink>
        </v-toolbar>
        <v-col cols="2" class="position-fixed top-0 left-0 right-0 bg-blue-grey-darken-1 h-100" style="min-width: 200px;" v-if="sidebar">
            <div @click="toggleSideBar">IMG</div>
            <RouterLink to="/" style="text-decoration: none;"><div class="text-h3 text-indigo-lighten-4 ephesis-regular ml-2">RegulArt</div></RouterLink>
            <v-row><RouterLink to="/"><v-btn>Home</v-btn></RouterLink></v-row>
            <v-row><RouterLink to="/posts"><v-btn>Posts</v-btn></RouterLink></v-row>
            <v-row><RouterLink to="/upload" v-if="user.loggedIn==true"><v-btn>Upload</v-btn></RouterLink></v-row>
            <v-row><RouterLink to="/admin" v-if="user.role=='admin'"><v-btn>Admin Panel</v-btn></RouterLink></v-row>
        </v-col>
        <v-col cols="1" class="position-fixed top-20 left-100 right-0 bg-blue-grey-darken-1" style="min-width: 150px;" v-if="profile">
            <v-row><v-btn @click="logout">Logout</v-btn></v-row>
        </v-col>
    </div>
</template>

<script lang="ts">
import { useUserStore } from '../stores/user'
import SearchBar from './SearchBar.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    components:{
        SearchBar
    },
    data(){
        return{
            user: useUserStore(),
            sidebar: false,
            profile: false
        }
    },
    methods:{
        toggleSideBar(){
            this.sidebar = !this.sidebar;
        },
        toggleProfile(){
            this.profile = !this.profile;
        },
        logout(){
            this.profile = false
            this.user.logout();
        }
    }
})
</script>