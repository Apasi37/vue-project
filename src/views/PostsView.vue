<template>

<div>
    <Header></Header>
    <v-container class="mt-16">
        <v-row class="mt-4">
            <v-col class="d-flex child-flex justify-center align-center" v-for="i in Images.slice((page-1)*20,page*20)">
                <RouterLink :to="'posts/'+i.id">
                    <v-img :src="i.src" width="300" max-height="300"></v-img>
                </RouterLink>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center">
                <RouterLink v-for="i in Math.ceil(Images.length/20)" :to="'/posts?page='+i">
                    <v-btn>{{ i }}</v-btn>
                </RouterLink>
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
            page: Number(this.$route.query.page),
        }
    },
    methods:{
        goToPage(page: number){
            this.$router.push({query: { page: page }})
        },
        getPage(){
            console.log(this.page)
        }
    },
    watch:{
        '$route.query.page'(newVal, oldVal){
            if (newVal != oldVal){
                this.page = newVal
            }
        }
    }
})
</script>