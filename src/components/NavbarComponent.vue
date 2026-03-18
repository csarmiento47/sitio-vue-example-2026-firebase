<template>
    <v-app-bar color="primary" density="comfortable" elevation="4" dark>
        <v-toolbar-title class="font-weight-bold">
            Vite Firebase
        </v-toolbar-title>
        <v-spacer />

        <v-btn class="me-2" to="/" :variant="route.name === 'home' ? 'tonal':'text'" color="white">Home</v-btn>

        <v-btn class="me-2" v-if="auth.user" to="/registro" :variant="route.name === 'registro' ? 'tonal':'text'" color="white">Registro</v-btn>

        <v-btn class="me-2" v-if="auth.user" to="/usuarios" :variant="route.name === 'usuarios' ? 'tonal':'text'" color="white">Usuarios</v-btn>

        <v-btn class="me-2" v-if="auth.user" to="/metricas" :variant="route.name === 'metricas' ? 'tonal':'text'" color="white">Métricas</v-btn>

        <v-btn class="me-2" v-if="!auth.user" to="/login" :variant="route.name === 'login' ? 'tonal':'text'" color="white">Login</v-btn>

        <v-btn class="me-2" v-if="!auth.user" to="/register" :variant="route.name === 'register' ? 'tonal':'text'" color="white">Registrate</v-btn>
   
        <v-btn v-if="auth.user" @click="logout" variant="tonal" color="error">Logout</v-btn>
   </v-app-bar>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const logout = async () => {
    await auth.logout();
    router.push('/');
}


</script>

<style lang="scss" scoped>

</style>