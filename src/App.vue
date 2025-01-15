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

import { defineComponent } from 'vue';
export default defineComponent({
  components:{
    RouterLink, RouterView
  }
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