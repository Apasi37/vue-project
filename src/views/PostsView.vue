<template>

<div>
    <Header></Header>
    <v-container class="mt-16">
        <v-row class="mt-4">
            <v-col class="d-flex child-flex justify-center align-center" v-for="i in Images">
                <RouterLink :to="'posts/'+i.id">
                    <v-img :src="i.src" width="300" max-height="300"></v-img>
                </RouterLink>
            </v-col>
            <v-col class="d-flex child-flex justify-center align-center" v-for="i in 20">
                <RouterLink to="posts/0">
                    <v-img src="/src/assets/placeholder.png" width="300" max-height="300"></v-img>
                </RouterLink>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center">
                <v-btn>1</v-btn>
            </v-col>
        </v-row>
    </v-container>
    <Footer></Footer>
</div>

</template>

<script lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import Images from '../Images.json';

import { defineComponent } from 'vue';
export default defineComponent({
    components:{
        Header, Footer
    },
    data(){
        return{
            Images,
        }
    }
})
</script>