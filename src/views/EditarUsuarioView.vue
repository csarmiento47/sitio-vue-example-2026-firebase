<template>
    <v-container>
        <UserFormComponent v-if="user" :user="user" />
    </v-container>
</template>

<script setup>
import UserFormComponent from '../components/UserFormComponent.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useUsersStore } from '../stores/usersStore';

const route = useRoute();
const store = useUsersStore();

const user = computed (() => {
    return store.users.find(u => u.id === route.params.id)
});

</script>

<style lang="scss" scoped>

</style>