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
                        <v-row>
                            <v-col>
                                <v-row align="center" justify="center">{{ Comments.length }} Comments</v-row>
                                <v-row align="center" justify="center" v-for="comment in Comments">
                                    <v-col cols="11">
                                        <v-list>
                                            <v-list-item>
                                                <div>
                                                    <div>{{ comment.date }}</div>
                                                    <div>{{ comment.user }}</div>
                                                </div>
                                                <div>{{ comment.comment }}</div>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="3" class="bg-blue-grey-darken-2">
                <v-list>
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
                        <div>Details</div>
                        <div>Date posted: {{ Img.date }}</div>
                        <div>Size: {{ imgWidth }}x{{ imgHeight }} pixels | {{ imgSize }}{{ imgSizeUnit }}</div>
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

import { defineComponent } from 'vue';
export default defineComponent({
    components: {
        Header, Footer
    },
    data(){
        return{
            ImagesData: JSON.parse(localStorage.getItem("Images") || ""),
            CommentsData: JSON.parse(localStorage.getItem("Comments") || ""),
            Img: {} as {id: number,src: string,user: string, name: string, desc: string, date: string},
            Comments: [] as { id: number, imgId: number, user: string, date: string, comment: string }[],
            imgWidth: 0, imgHeight: 0, imgMaxW:1000, imgMaxH:1000, imgSize: 0, imgSizeUnit: "B",
        }
    },
    methods:{
        getImageSize(){
            fetch(String(this.Img.src)).then(resp => resp.blob()).then(blob => {this.imgSize = blob.size; this.setImageUnit();});
            let image = new Image(); image.src = this.Img.src;
            this.imgWidth = image.naturalWidth; this.imgHeight = image.naturalHeight;
        },
        setImageUnit(){
            if(this.imgSize>1000){
                this.imgSize = this.imgSize/1000; this.imgSizeUnit = "kB";
            }else if(this.imgSize>1000000){
                this.imgSize = this.imgSize/1000000; this.imgSizeUnit = "MB";
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
        }
    },
    mounted() {
        this.getImage();
        this.getImageSize();
        this.getComments();
    },
})
</script>