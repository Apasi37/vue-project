<template>
<div class="mt-12">
    <Header></Header>
    <v-row align="center" justify="center" class="ma-8 mt-16">
        <v-col cols="6">
            <v-img :src="url"></v-img>
        </v-col>
        <v-col cols="6 bg-blue-grey-darken-2 rounded">
            <v-form>
                <v-file-input dark label="File input" show-size accept="image/png, image/jpeg" @change="onFileChange"></v-file-input>
                <v-text-field label="Name" :rules="rulesName" v-model="name"></v-text-field>
                <v-textarea label="Description" auto-grow counter v-model="desc"></v-textarea>
                <v-btn class="mt-2 text-white" variant="outlined" block @click="upload">Upload</v-btn>
            </v-form>
            <div v-if="error">error</div>
        </v-col> 
    </v-row>
    <Footer></Footer>
</div>
</template>

<script lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { useUserStore } from '../stores/user';

import { defineComponent } from 'vue';
export default defineComponent({
    components: {
        Header, Footer
    },
    data(){
        return {
            user: useUserStore(),
            ImagesData: JSON.parse(localStorage.getItem("Images") || ""),
            url: "../src/assets/placeholder.png",
            name: "",
            desc: "",
            error: false,
            rulesName: [
                (value: any) => !!value || 'Required.',
                (value: any) => (value || '').length <= 40 || 'Max 40 characters',
            ],
        }
    },
    methods:{
        onFileChange(e: any) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },
        upload(){
            let date = new Date();
            let image = {
                id: this.ImagesData.length+1,
                src: this.url,
                user: this.user.name,
                name: this.name,
                desc: this.desc,
                date: date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
            }
            console.log(image.date);
            this.ImagesData.push(image);
            localStorage.setItem("Images", JSON.stringify(this.ImagesData));
        }
    },
    mounted() {
        if(!this.user.loggedIn){
            this.$router.push({ path: '/'})
        }
    },
})
</script>