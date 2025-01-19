<template>
<div>
<Header></Header>

<v-row class="ma-12">
    <v-col class="ma-2">
        <div align="center" justify="center">
            <v-btn class="text-white ma-1" variant="outlined" v-for="i in TablesData" @click="setTable(i)">{{ i }}</v-btn>
        </div>
        <v-table density="compact" class="bg-black bg-blue-grey-darken-1 rounded">
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
                </tr>
            </tbody>
        </v-table>
        <div align="center" justify="center">
            <RouterLink v-for="i in Math.ceil(table.length/20)" :to="'/admin?page='+i">
                <v-btn class="text-white ma-1" variant="outlined">{{ i }}</v-btn>
            </RouterLink>
        </div>
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
            this.$router.push({ path: '/'})
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