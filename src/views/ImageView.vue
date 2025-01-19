<template>

<div>
    <Header></Header>
    <v-container class="mt-16" fluid>
        <v-row>
            <v-col>
                <v-row align="center" justify="center">
                    <v-img class="ma-8" :src="Img.src" 
                        max-width="1000" max-height="1000"
                        min-width="200" min-height="200"
                    ></v-img>
                </v-row>
                <v-row class="bg-blue-grey-darken-2">
                    <v-col>
                        <v-row>
                            <v-col align="center" justify="center">
                                
                            </v-col>
                        </v-row>
                        <v-row class="pb-12">
                            <v-col>
                                <v-textarea v-if="user.loggedIn" class="mb-6" density="comfortable" rows="1" clearable counter label="Comment" :rules="rulesComment" v-model="commentText" @keyup.enter="comment(commentText)"></v-textarea>
                                <v-row align="center" justify="center">{{ Comments.length }} Comments</v-row>
                                <v-row align="center" justify="center" v-for="i in Comments">
                                    <Comment :comment="i"></Comment>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="3" class="bg-blue-grey-darken-2">
                <v-list rounded class="bg-blue-grey-lighten-1">
                    <v-list-item>
                        <div class="text-h4">{{ Img.name }}</div>
                        <div>{{ Img.user }}</div>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <div>{{ Img.desc}}</div>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <div>Date posted: {{ Img.date }}</div>
                        <div>Size: {{ imgWidth }}x{{ imgHeight }} pixels | {{ imgSize }} {{ imgSizeUnit }}</div>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
    <Footer></Footer>
</div>

</template>

<script lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Comment from '../components/Comment.vue';

import { useUserStore } from '../stores/user';

import { defineComponent } from 'vue';
export default defineComponent({
    components: {
        Header, Footer, Comment
    },
    data(){
        return{
            user: useUserStore(),
            ImagesData: JSON.parse(localStorage.getItem("Images") || ""),
            CommentsData: JSON.parse(localStorage.getItem("Comments") || ""),
            Img: {} as {id: number,src: string,user: string, name: string, desc: string, date: string},
            Comments: [] as { id: number, imgId: number, user: string, date: string, comment: string }[],
            imgWidth: 0, imgHeight: 0, imgMaxW:1000, imgMaxH:1000, imgSize: 0, imgSizeUnit: "B",
            commentText: "",
            rulesComment: [
                (value: any) => (value || '').length <= 40 || 'Max 500 characters',
            ],
        }
    },
    methods:{
        getImageSize(){
            fetch(String(this.Img.src)).then(resp => resp.blob()).then(blob => {this.imgSize = blob.size; this.setImageUnit();});
            let image = new Image(); image.src = this.Img.src;
            this.imgWidth = image.naturalWidth; this.imgHeight = image.naturalHeight;
        },
        setImageUnit(){
            if(this.imgSize>1000000){
                this.imgSize = this.imgSize/1000000; this.imgSizeUnit = "MB";
            }else if(this.imgSize>1000){
                this.imgSize = this.imgSize/1000; this.imgSizeUnit = "kB";
            }
        },
        getImage(){
            for(let i=0; i<this.ImagesData.length; i++){
                if(this.ImagesData[i].id == Number(this.$route.params.id)){
                    this.Img = this.ImagesData[i]; break;
                }
            }
        },
        getComments(){
            for(let i=0; i<this.CommentsData.length; i++){
                if(this.CommentsData[i].imgId == Number(this.$route.params.id)){
                    this.Comments.push(this.CommentsData[i]) ;
                }
            }
        },
        comment(commentText: string){
            let date = new Date();
            let comment = {
                id: this.Comments.length+1,
                imgId: this.$route.params.id,
                user: this.user.name,
                date: date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
                comment: commentText
            }
            this.CommentsData.push(comment);
            localStorage.setItem("Comments", JSON.stringify(this.CommentsData));
        }
    },
    mounted() {
        this.getImage();
        this.getImageSize();
        this.getComments();
    },
})
</script>