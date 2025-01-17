<template>
<div>
<Header></Header>

<v-row class="ma-12">
    <v-col class="ma-12">
        <v-btn v-for="i in TablesData" @click="setTable(i)">{{ i }}</v-btn>
        <v-table density="compact">
            <thead>
                <tr>
                    <th class="text-left" v-for="i in keys">
                        {{ i }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in table.slice((page-1)*20,page*20)">
                    <td v-for="j in i">{{ j }}</td>
                    <v-btn>Edit</v-btn>
                    <v-btn>Delete</v-btn>
                </tr>
            </tbody>
        </v-table>
        <RouterLink v-for="i in Math.ceil(table.length/20)" :to="'/admin?page='+i">
            <v-btn>{{ i }}</v-btn>
        </RouterLink>
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
        return{
            user: useUserStore(),
            ImagesData: JSON.parse(localStorage.getItem("Images") || ""),
            CommentsData: JSON.parse(localStorage.getItem("Comments") || ""),
            UsersData: JSON.parse(localStorage.getItem("Users") || ""),
            TablesData: ["Images","Comments","Users"],
            table: [],
            keys: [""],
            page: Number(this.$route.query.page) || 1
        }
    },
    methods:{
        setTable(selected: string){
            switch(selected){
                case "Images":
                    this.table = this.ImagesData;
                    break;
                case "Comments":
                    this.table = this.CommentsData;
                    break;
                case "Users":
                    this.table = this.UsersData;
                    break;
            }
            this.keys = Object.keys(this.table[0]);
            this.goToPage(1)
        },
        goToPage(page: number){
            this.$router.push({query: { page: page }})
        },
    },
    mounted() {
        if(this.user.role != "admin"){
            //this.$router.push({ path: '/'})
        }
        this.table = this.ImagesData;
        this.keys = Object.keys(this.table[0]);
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