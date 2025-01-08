<template>
<v-row align="center" justify="center">
    <v-col cols="5" class="bg-white">
        <v-form>
            <v-text-field label="Username" density="comfortable"></v-text-field>
            <v-text-field label="Password" density="comfortable" ></v-text-field>
            <v-btn class="mt-2" type="submit" block>Login</v-btn>
        </v-form>
    </v-col>
</v-row>

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
            
        }
    },
    methods:{
        
    },
    mounted() {
        
    },
})
</script>