<template>

<div>
    <Header></Header>
    <v-container class="mt-16">
        <v-row class="mt-4">
            <Post v-if="searched!=''" class="ma-6" v-for="i in ImagesData.slice((page-1)*20,page*20)" :id="i.id" :src="i.src"></Post>
            <Post v-else class="ma-6" v-for="i in ImagesData.slice((page-1)*20,page*20)" :id="i.id" :src="i.src"></Post>
        </v-row>
        <v-row>
            <v-col class="text-center">
                <RouterLink v-for="i in Math.ceil(ImagesData.length/20)" :to="'/posts?page='+i+'&search='+searched">
                    <v-btn class="ma-1 text-white" variant="outlined">{{ i }}</v-btn>
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
import Post from '../components/Post.vue';

import { defineComponent } from 'vue';
export default defineComponent({
    components:{
        Header, Footer, Post
    },
    data(){
        return{
            ImagesData: JSON.parse(localStorage.getItem("Images") || ""),
            page: Number(this.$route.query.page) || 1,
            searched: ""
        }
    },
    watch:{
        '$route.query.page'(newVal, oldVal){
            if (newVal != oldVal){
                this.page = newVal
            }
        },
        '$route.query.search'(newVal, oldVal){
            if (newVal != oldVal){
                this.searched = newVal;
                this.ImagesData = JSON.parse(localStorage.getItem("Images") || ""),
                this.ImagesData = this.getImages();
            }
        }
    }, 
    methods:{
        getImages(){
            let Images = [];
            for(let i=0; i<this.ImagesData.length; i++){
                console.log(this.ImagesData[i])
                let name = this.ImagesData[i].name;
                if(name.includes(this.searched)){
                    console.log("PUSHING" + this.ImagesData[i])
                    Images.push(this.ImagesData[i]);
                }
            }
            return Images;
        }
    }
})
</script>