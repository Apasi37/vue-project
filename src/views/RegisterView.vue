<template>
    <v-row align="center" justify="center">
        <v-col cols="5" class="bg-white">
            <RouterLink to="/" style="text-decoration: none;"><div class="text-h3 text-indigo-lighten-4 ephesis-regular mb-6">RegulArt</div></RouterLink>
            <v-form v-if="!user.loggedIn">
                <v-text-field label="Username" density="comfortable" :rules="rulesName" v-model="username"></v-text-field>
                <v-text-field label="Email" density="comfortable" :rules="rulesEmail" v-model="email"></v-text-field>
                <v-text-field label="Password" density="comfortable" :rules="rulesPassword" v-model="password"></v-text-field>
                <v-btn class="mt-2" block @click="register(username,email,password)">Register</v-btn>
            </v-form>
            <div v-if="error">Incorret email or password</div>
        </v-col> 
    </v-row>
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
            error: false,
            Users: JSON.parse(localStorage.getItem("Users") || ""),
            user: useUserStore(),
            email: "", password: "", username: "",
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
        register(username: string, email: string, password: string){
            let user = {
                id: this.Users.length+1,
                email: email,
                password: password,
                name: username,
                role: "user"
            }
            this.Users.push(user);
            localStorage.setItem("Users", JSON.stringify(this.Users));
        },
    }
})
</script>
    