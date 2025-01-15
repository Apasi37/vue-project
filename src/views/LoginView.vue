<template>
<v-row align="center" justify="center">
    <v-col cols="5" class="bg-white">
        <div class="text-h3 text-indigo-lighten-4 ephesis-regular ml-2">RegulArt</div>
        <v-form v-if="!user.loggedIn">
            <v-text-field label="Email" density="comfortable" :rules="rulesEmail" v-model="email"></v-text-field>
            <v-text-field label="Password" density="comfortable" :rules="rulesPassword" v-model="password"></v-text-field>
            <v-btn class="mt-2" block @click="login(email,password)">Login</v-btn>
        </v-form>
        <div v-else>
            <div>You are logged in as {{ user.name }}</div>
            <router-link to="/">Home</router-link>
        </div>
        <div v-if="error">Incorret email or password</div>
    </v-col> 
</v-row>

</template>

<script lang="ts">
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Users from '../Users.json';
import { useUserStore } from '../stores/user';

import { defineComponent } from 'vue';
export default defineComponent({
    components: {
        Header, Footer
    },
    data(){
        return {
            error: false,
            Users,
            user: useUserStore(),
            email: "", password: "",
            rulesName: [
                (value: any) => !!value || 'Required.',
                (value: any) => (value || '').length <= 40 || 'Max 40 characters',
            ],
            rulesEmail: [
                (value: any) => !!value || 'Required.',
                (value: any) => (value || '').length <= 254 || 'Max 254 characters',
                (value: string) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            ],
            rulesPassword: [
                (value: any) => !!value || 'Required.',
                (value: any) => (value || '').length >= 5 || 'Minimum 5 characters',
                (value: any) => (value || '').length <= 254 || 'Max 254 characters',
            ]
        }
    },
    methods:{
        login(email: string, password: string){
            for(let i=0; i<=this.Users.length; i++){
                console.log(this.Users[i].id)
                if(this.Users[i].email == email){
                    if(this.Users[i].password == password){
                        this.error = false;
                        this.user.login(this.Users[i].name, this.Users[i].role)
                        break;
                    }
                }
                this.error = true;
            }
        },
    }
})
</script>