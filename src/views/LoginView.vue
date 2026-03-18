<template>
    <v-container>
        <v-row>
            <v-col class="mx-auto" cols="12" md="6">
                <v-card  class="pa-4">
                    <v-card-text>
                        Login
                    </v-card-text>
                    <v-text-field type="email" v-model="email" label="Email" class="mb-2" data-cy="login-email"/>
                    <v-text-field type="password" v-model="password" label="Password" class="mb-2" data-cy="login-password"/>
                    <v-btn class="me-2" variant="tonal" @click="login" color="primary" data-cy="login-submit">Login</v-btn>
                    <v-btn color="errors" variant="tonal" to="/register" class="pa-2">Si no tienes cuanta registrate
                        aquí</v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { useUiStore } from '../stores/uiStores';

const email = ref('');
const password = ref('');
const auth = useAuthStore();
const ui = useUiStore();
const route = useRoute();
const router = useRouter();


const login = async () => {
    try {
        await auth.login(email.value, password.value);
        const redirect = route.query.redirect || "/"
        ui.showSuccess("Sesión iniciada con éxito");
        router.push(redirect);
    } catch {
        ui.showError("Credenciales incorrectas...");
    }
}
</script>

<style lang="scss" scoped></style>