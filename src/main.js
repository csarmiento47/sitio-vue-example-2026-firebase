import { createApp } from "vue";
import App from './App.vue';
import { createPinia } from "pinia";
import router from './router';
import { vuetify } from './plugins/vuetify';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import '@mdi/font/css/materialdesignicons.css';
import { useAuthStore } from "./stores/authStore";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(Toast)

const authStore = useAuthStore();
authStore.inithAuth();

app.mount('#app')