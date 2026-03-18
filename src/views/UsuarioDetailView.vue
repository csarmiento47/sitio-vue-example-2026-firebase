<template>
    <v-container v-if="user">
        <v-card class="mx-auto" max-width="344">
            <v-img height="400px" :src="user.foto" cover></v-img>

            <v-card-title>
                {{ user.nombre }} {{ user.apellido }}
            </v-card-title>

            <v-card-subtitle>
                {{ calculateEdad(user.dob) }} años
            </v-card-subtitle>

            <v-card-actions>
                <v-btn color="orange-lighten-2" text="Explorar"></v-btn>

                <v-spacer></v-spacer>

                <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>
                    <v-card-text>
                        Email: {{ user.email }}
                    </v-card-text>
                    <v-card-text>
                        País: {{ user.pais }}
                    </v-card-text>
                    <v-card-text>
                        Género: {{ user.genero }}
                    </v-card-text>
                    <v-card-text>
                        Fecha nacimiento: {{ formatDate(user.dob) }}
                    </v-card-text>
                    <v-card-text>
                        Hobbies: {{ user.hobbies.join(', ') }}
                    </v-card-text>
                </div>
            </v-expand-transition>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUsersStore } from '../stores/usersStore';
import { useEdad } from '../composables/useEdad';

const show = ref(false)
const route = useRoute();
const store = useUsersStore();
const { calculateEdad } = useEdad();

const user = store.users.find(u => u.id === route.params.id);

const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`; // Resultado: 25-10-2023
};

</script>

<style lang="scss" scoped></style>