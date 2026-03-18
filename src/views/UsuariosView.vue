<template>
    <v-container>
        <v-card elevation="3">
            <v-card-title>
                Usuarios registrados
            </v-card-title>
            <v-data-table :headers="headers" :items="store.users">
                <template v-slot:item.foto="{ item }">
                    <v-avatar>
                        <v-img :src="item.foto" cover/>
                    </v-avatar>
                </template>
                <template v-slot:item.nombre="{ item }">
                    {{ item.nombre }} {{ item.apellido }}
                </template>
                <template v-slot:item.edad="{ item }">
                    {{ calculateEdad(item.dob) }} años
                </template>
                <template v-slot:item.hobbies="{ item }">
                    <v-chip v-for="h in item.hobbies" :key="h" size="small" class="ma-1" color="primary">
                        {{ h }}
                    </v-chip>
                </template>
                <template v-slot:item.acciones="{ item }">
                    <v-btn icon="mdi-eye" size="small" color="secondary" @click="verUsuario(item.id)" class="ma-1"/>
                    <v-btn icon="mdi-pencil" size="small" color="warning" @click="editarUsuario(item.id)" class="ma-1"/>
                    <v-btn icon="mdi-delete" size="small" color="error" @click="eliminarUsuario(item.id)" class="ma-1"/>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Swal from 'sweetalert2';

import { useUsersStore } from '../stores/usersStore';
import { useEdad } from '../composables/useEdad';
import { useUiStore } from '../stores/uiStores';

const store = useUsersStore();
const ui = useUiStore();
const router = useRouter();
const { calculateEdad } = useEdad();

const headers = [
    { title: "Foto", key: "foto" },
    { title: "Rut", key: "rut" },
    { title: "Nombre", key: "nombre" },
    { title: "Género", key: "genero" },
    { title: "País", key: "pais" },
    { title: "Edad", key: "edad" },
    { title: "Hobbies", key: "hobbies" },
    { title: "Acciones", key: "acciones"}
]

const verUsuario = (id) => {
    router.push(`/usuario/${id}`);
}

const editarUsuario = (id) => {
    router.push(`/usuario/${id}/editar`);
}

const eliminarUsuario = async (id) => {
    const result = await Swal.fire({
        title: "Eliminar usuario?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar"
    })
    if (result.isConfirmed) {
        await store.deleteUser(id);
        ui.showSuccess("Usuario eliminado satisfactoriamente.")
    }
}


onMounted(() => {
    store.loadUsers();
});

</script>

<style lang="scss" scoped>

</style>