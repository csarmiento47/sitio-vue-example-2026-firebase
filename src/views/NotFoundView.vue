<template>
    <v-empty-state action-text="Volver" icon="mdi-magnify" headline="Whoops, 404" title="Página no encontrada" text="La página que estas buscando no existe..." 
        @click:action="action"></v-empty-state>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const action = () => {
    router.push('/');
}

</script>