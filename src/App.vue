<template>
  <v-app class="bg-blue-grey-darken-4">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </v-app>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ImagesData from './Images.json'
import CommentsData from './Comments.json'
import UsersData from './Users.json'

import { defineComponent } from 'vue';
export default defineComponent({
  components:{
    RouterLink, RouterView
  },
  mounted() {
    if(!localStorage.getItem("Images")){
      localStorage.setItem("Images", JSON.stringify(ImagesData));
    }
    if(!localStorage.getItem("Comments")){
      localStorage.setItem("Comments", JSON.stringify(CommentsData));
    }
    if(!localStorage.getItem("Users")){
      localStorage.setItem("Users", JSON.stringify(UsersData));
    }
  },
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ephesis&display=swap');
.ephesis-regular {
  font-family: "Ephesis", serif;
  font-weight: 400;
  font-style: normal;
}
.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>