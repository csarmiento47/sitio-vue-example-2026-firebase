<template>
    <v-container>
        <v-card class="pa-4">
            <v-card-text>
                Registro usuario
            </v-card-text>
            <v-text-field type="email" v-model="email" label="Email" class="mb-2" data-cy="register-email" />
            <v-text-field type="password" v-model="password" label="Password" class="mb-2" data-cy="register-password"/>
            <v-btn color="primary" variant="tonal" @click="register" data-cy="register-submit" >Registrarse</v-btn>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { useUiStore } from '../stores/uiStores';

const router = useRouter();
const auth = useAuthStore();
const ui = useUiStore();


const email = ref('');
const password = ref('');

const register = async () => {
    try{
        await auth.register(email.value, password.value);
        ui.showSuccess("Te has registrado satisfactoriamente.");
        router.push('/');
    }
    catch(e) {
        ui.showError("Se ha producido un error en el proceso de registro. Inténtalo nuevamente más rato.");
    }

}
</script>

<style lang="scss" scoped>

</style>