<template>
    <v-row align="center" justify="center">
        <v-col cols="5" class="bg-white">
            <v-form>
                <v-text-field label="Username" density="comfortable" :rules="rulesName"></v-text-field>
                <v-text-field label="Email" density="comfortable" :rules="rulesEmail"></v-text-field>
                <v-text-field label="Password" density="comfortable" :rules="rulesEmail"></v-text-field>
                <v-text-field label="Repeat Password" density="comfortable" :rules="rulesEmail"></v-text-field>
                <v-btn class="mt-2" type="submit" block>Login</v-btn>
            </v-form>
        </v-col>
    </v-row>
    
    </template>
    