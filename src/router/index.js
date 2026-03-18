import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "../stores/authStore";

import HomeView from '../views/HomeView.vue';
import RegistroUsuarioView from "../views/RegistroUsuarioView.vue";
import UsuariosView from "../views/UsuariosView.vue";
import UsuarioDetailView from "../views/UsuarioDetailView.vue";
import EditarUsuarioView from "../views/EditarUsuarioView.vue";
import MetricasView from "../views/MetricasView.vue";
import NotFoundView from "../views/NotFoundView.vue";

import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/registro',
        name: 'registro',
        component: RegistroUsuarioView,
        meta: { requiresAuth: true }
    },
    {
        path: '/usuarios',
        name: 'usuarios',
        component: UsuariosView,
        meta: { requiresAuth: true }
    },
    {
        path: '/usuario/:id',
        name: 'detalle',
        component: UsuarioDetailView,
        meta: { requiresAuth: true }
    },
    {
        path: '/usuario/:id/editar',
        name: 'editar',
        component: EditarUsuarioView,
        meta: { requiresAuth: true }
    },
    {
        path: '/metricas',
        name: 'metricas',
        component: MetricasView,
        meta: { requiresAuth: true }
    },
    {
        path: '/404',
        name: 'notfound',
        component: NotFoundView
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    if (auth.loading) {
        const unwatch = auth.$subscribe(() => {
            if (!auth.loading) {
                unwatch();
                handleRoute();
            }
        })
    }
    else {
        handleRoute();
    }
    function handleRoute() {
        if (auth.user && (to.name === 'login' || to.name === 'register')) {
            next(from.fullPath || '/');
            return
        }


        if (to.meta.requiresAuth && !auth.user) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }

        next();
    }
})

export default router;
