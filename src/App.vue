<template>
    <v-app>
        <NavbarComponent v-if="showLayout" />
        <v-main class="main-background">
            <v-progress-linear v-if="auth.loading" indeterminate color="primary" />

            <router-view v-else v-slot="{ Component }">
                <transition name="fade-slide" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </v-main>
        <FooterComponent v-if="showLayout" />
        <v-snackbar v-model="ui.snackbar" :color="ui.color" timeout="2000">
            <div class="d-flex justify-center w-100">
                {{ ui.message }}
            </div>
        </v-snackbar>
    </v-app>
</template>

<script setup>
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { useRoute } from 'vue-router';
import { useUiStore } from './stores/uiStores';
import { computed } from 'vue';
import { useAuthStore } from './stores/authStore';

const route = useRoute();
const ui = useUiStore();
const auth = useAuthStore();

const showLayout = computed(() => {
    return route.name !== 'notfound'
});

</script>

<style>
.main-background {
    background: #cdd0d4;
    min-height: 90vh;
}

.border-flag {
    border: 1px solid #ddd;
    border-radius: 3px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>
