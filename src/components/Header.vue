<template>
    <div class="position-fixed top-0 left-0 right-0" style="z-index: 2001;">
        <v-toolbar class="bg-blue-grey-darken-1">
            <v-icon class="ml-2 mr-2" icon="mdi-menu" size="large" @click="toggleSideBar"></v-icon>
            <RouterLink to="/" style="text-decoration: none;"><div class="text-h3 text-indigo-lighten-4 ephesis-regular ml-2">RegulArt</div></RouterLink>
            <v-spacer></v-spacer>
            <SearchBar></SearchBar>
            <v-spacer></v-spacer>
            <v-btn append-icon="mdi-account-circle" class="text-white ma-4" variant="outlined" v-if="user.loggedIn" @click="toggleProfile">{{user.name}}</v-btn>
            <RouterLink v-if="!user.loggedIn" to="/login"><v-btn class="ma-4 text-white" variant="outlined">Login</v-btn></RouterLink>
        </v-toolbar>
        <v-col cols="1" class="position-fixed top-20 left-0 right-0 bg-blue-grey-darken-2 h-100 d-flex flex-column" style="min-width: 200px;" v-if="sidebar">
            <RouterLink to="/" style="text-decoration: none;"><v-btn block class="text-white mb-1" variant="outlined">Home</v-btn></RouterLink>
            <RouterLink to="/posts" style="text-decoration: none;"><v-btn block class="text-white mb-1" variant="outlined">Posts</v-btn></RouterLink>
            <RouterLink to="/upload" v-if="user.loggedIn==true" style="text-decoration: none;"><v-btn block class="text-white mb-1" variant="outlined">Upload</v-btn></RouterLink>
            <RouterLink to="/admin" v-if="user.role=='admin'" style="text-decoration: none;"><v-btn block class="text-white mb-1" variant="outlined">Admin Panel</v-btn></RouterLink>
        </v-col>
        <v-col cols="1" class="position-fixed top-20 left-100 right-0 bg-blue-grey-darken-2" style="min-width: 150px;" v-if="profile">
            <v-btn class="text-white" variant="outlined" block @click="logout">Logout</v-btn>
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
            this.$router.push({ path: '/'})
        }
    }
})
</script>