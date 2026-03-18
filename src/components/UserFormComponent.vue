<template>
    <v-card class="pa-4">
        <v-card-title>
            {{ props.user ? 'Actualizar Persona' : 'Registrar nuev persona' }}
        </v-card-title>
        <v-form ref="formRef">
            <v-text-field label="RUT" v-model="form.rut" @input="handleRutInput"
                :rules="[rules.required, rules.rutRule]" variant="outlined" data-cy="registro-rut"/>

            <v-text-field label="Nombre" v-model="form.nombre" :rules="[rules.required]" variant="outlined" data-cy="registro-nombre"/>

            <v-text-field label="Apellido" v-model="form.apellido" :rules="[rules.required]" variant="outlined" data-cy="registro-apellido" />

            <v-text-field label="Fecha Nacimiento" type="date" v-model="form.dob" :rules="[rules.required]"
                variant="outlined" />

            <v-select label="Genero" :items="['Femenino', 'Masculino', 'Otro']" v-model="form.genero"
                :rules="[rules.required]" variant="outlined" />

            <v-text-field label="Email" v-model="form.email" :rules="[rules.required, rules.emailRule]"
                variant="outlined" />

            <v-text-field label="Password" type="password" v-model="form.password"
                :rules="[rules.required, rules.password]" variant="outlined" />

            <v-file-input label="Foto perfil" accept="image/*" @change="handleFile" />

            <v-autocomplete label="País" clearable density="comfortable" menu-icon="mdi-earth" :items="countries"
                item-title="name" item-value="name" v-model="form.pais" :rules="[rules.required]" variant="outlined">
                <!-- ITEM DEL DROPDOWN -->
                <template #item="{ props, item }">
                    <v-list-item v-bind="props">
                        <template #prepend>
                            <v-img :src="item.raw?.flag || item.flag" width="28" height="18" cover
                                class="mr-2 border-flag" />
                        </template>
                    </v-list-item>
                </template>
                <!-- ITEM SELECCIONADO -->
                <template #selection="{ item }">
                    <v-chip>
                        <v-img :src="item.raw?.flag || item.flag" width="24" height="16" class="mr-2 border-flag" />
                        {{ item.raw?.name || item.name }}
                    </v-chip>
                </template>
            </v-autocomplete>

            <v-select label="Hobbies" :items="hobbiesOptions" multiple chips v-model="form.hobbies" />

            <v-switch label="Aceptar términos y condiciones" v-model="form.terminos" :rules="[rules.required]"
                variant="outlined" />

            <v-btn color="primary" class="mt-4" @click="submit">
                {{ props.user ? 'Actualizar Usuario' : 'Registrar Usuario' }}
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUsersStore } from '../stores/usersStore';
import { useUiStore } from '../stores/uiStores';
import { getCountries } from '../services/countriesService';
import { useRouter } from 'vue-router';
import { useEmail } from '../composables/useEmail';
import { useRut } from '../composables/useRut';

const router = useRouter();
const store = useUsersStore();
const ui = useUiStore();
const { validateEmail } = useEmail();
const { formatRut, validateRut } = useRut()

const props = defineProps({
    user: Object
});

const countries = ref([])

const hobbiesOptions = [
    "Deportes",
    "Leer",
    "Teatro",
    "Cine",
    "Viajar",
    "Comer"
]

const form = ref({
    rut: props.user?.rut || '',
    nombre: props.user?.nombre || '',
    apellido: props.user?.apellido || '',
    dob: props.user?.dob || '',
    genero: props.user?.genero || '',
    email: props.user?.email || '',
    password: props.user?.password || '',
    foto: props.user?.foto || '',
    pais: props.user?.pais || '',
    hobbies: props.user?.hobbies || [],
    terminos: props.user?.terminos || false
});

const formRef = ref(null);

const rules = {
    required: v => !!v || "Campo obligatorio",
    emailRule: v => validateEmail(v) || "Email o formato inválido",
    rutRule: v => validateRut(v) || "RUT inválido",
    password: v => v.length >= 6 || "Minimo 6 caracteres"
}

const handleRutInput = () => {
    form.value.rut = formatRut(form.value.rut)
}

const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return
    form.value.foto = await fileToBase64(file)
}

const submit = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid) {
        ui.showError("Debe corregir los campos del formulario")
        return
    }
    if (!form.value.terminos) {
        ui.showError("Debe aceptar los términos")
        return
    }

    try {
        const exists = store.userExists(
            form.value.email,
            form.value.rut,
            props.user ? props.user.id : null
        )
        if (exists.emailExists) {
            ui.showError("El email ya está registrado")
            return
        }
        if (exists.rutExists) {
            ui.showError("El RUT ya está registrado")
            return
        }

        // EDITAR USUARIO
        if (props.user) {
            await store.updateUser(props.user.id, form.value)
            ui.showSuccess("Usuario actualizado correctamente")
            router.push("/usuarios")
        }

        // REGISTRAR USUARIO
        else {
            await store.addUser(form.value)
            ui.showSuccess("Usuario registrado correctamente")
            resetForm()
            router.push("/usuarios")
        }

    } catch (error) {
        console.error(error)
        ui.showError("Error al guardar usuario")
    }

}

const resetForm = () => {
    form.value = {
        rut: '',
        nombre: '',
        apellido: '',
        nacimiento: '',
        genero: '',
        email: '',
        password: '',
        foto: '',
        pais: '',
        hobbies: [],
        terminos: false
    }
}


onMounted(async () => {
    countries.value = await getCountries();
})


</script>

<style lang="scss" scoped></style>