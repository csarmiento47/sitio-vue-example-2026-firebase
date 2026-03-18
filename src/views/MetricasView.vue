<template>
    <v-container>
        <h2 class="mb-6">
            Dashboard de Métricas
        </h2>

        <!-- KPI CARDS -->
        <v-row class="mb-6">
            <v-col cols="12" md="3">
                <v-card color="primary" dark>
                    <v-card-title>
                        Usuarios Totales
                    </v-card-title>
                    <v-card-text class="text-h4">
                        {{ totalUsers }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card color="success" dark>
                    <v-card-title>
                        Edad Promedio
                    </v-card-title>
                    <v-card-text class="text-h4">
                        {{ averageAge }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card color="warning" dark>
                    <v-card-title>
                        Países Registrados
                    </v-card-title>
                    <v-card-text class="text-h4">
                        {{ countriesCount }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card color="secondary" dark>
                    <v-card-title>
                        País con más usuarios
                    </v-card-title>
                    <v-card-text class="text-h6">
                        {{ mostCommonCountry }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- GRÁFICOS -->
        <v-row>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>
                        Usuarios por Género
                    </v-card-title>
                    <v-card-text>
                        <Pie :data="usersByGender" :options="chartOptions" />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>
                        Usuarios por País
                    </v-card-title>
                    <v-card-text>
                        <Pie :data="usersByCountry" :options="chartOptions" />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>
                        Promedio Edad por País
                    </v-card-title>
                    <v-card-text>
                        <Bar :data="averageAgeByCountry" :options="chartOptions" />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>
                        Distribución de Edades
                    </v-card-title>
                    <v-card-text>
                        <Bar :data="ageDistribution" :options="chartOptions" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>

import { onMounted } from "vue";
import { computed } from "vue";
import { useUsersStore } from "../stores/usersStore";
import { useEdad } from "../composables/useEdad";
import { chartColors } from "../utils/chartColors";
import { Pie, Bar } from "vue-chartjs";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const store = useUsersStore();
const { calculateEdad } = useEdad();

onMounted(() => {
    store.loadUsers();
});

const totalUsers = computed(() => store.users.length)


const averageAge = computed(() => {
    if (!store.users.length) return 0
    const sum = store.users.reduce((acc, user) => {
        return acc + calculateEdad(user.dob)
    }, 0)
    return Math.round(sum / store.users.length)
})


const countriesCount = computed(() => {
    const set = new Set(store.users.map(u => u.pais))
    return set.size
})


const mostCommonCountry = computed(() => {
    const stats = {}
    store.users.forEach(user => {
        stats[user.pais] = (stats[user.pais] || 0) + 1
    })
    const sorted = Object.entries(stats)
        .sort((a, b) => b[1] - a[1])
    return sorted.length ? sorted[0][0] : "-"
})


const usersByGender = computed(() => {
    const stats = {}
    store.users.forEach(user => {
        const gender = user.genero || "No definido"
        stats[gender] = (stats[gender] || 0) + 1
    })
    return {
        labels: Object.keys(stats),
        datasets: [{
            label: "Usuarios por género",
            data: Object.values(stats),
            backgroundColor: chartColors
        }]
    }
})


const usersByCountry = computed(() => {
    const stats = {}
    store.users.forEach(user => {
        const country = user.pais || "Desconocido"
        stats[country] = (stats[country] || 0) + 1
    })
    return {
        labels: Object.keys(stats),
        datasets: [{
            label: "Usuarios por país",
            data: Object.values(stats),
            backgroundColor: chartColors
        }]
    }
});


const averageAgeByCountry = computed(() => {
    const stats = {}
    store.users.forEach(user => {
        const country = user.pais
        const age = calculateEdad(user.dob)
        if (!stats[country]) {
            stats[country] = {
                total: 0,
                count: 0
            }
        }
        stats[country].total += age
        stats[country].count++
    })
    const labels = Object.keys(stats)
    const averages = labels.map(country => {
        return Math.round(
            stats[country].total / stats[country].count
        )
    })
    return {
        labels,
        datasets: [{
            label: "Edad promedio",
            data: averages,
            backgroundColor: chartColors
        }]
    }
});


const ageDistribution = computed(() => {
    const ranges = {
        "18-25": 0,
        "26-35": 0,
        "36-45": 0,
        "46-60": 0,
        "60+": 0
    }

    store.users.forEach(user => {
        const age = calculateEdad(user.dob)
        if (age <= 25) ranges["18-25"]++
        else if (age <= 35) ranges["26-35"]++
        else if (age <= 45) ranges["36-45"]++
        else if (age <= 60) ranges["46-60"]++
        else ranges["60+"]++
    })
    return {
        labels: Object.keys(ranges),
        datasets: [{
            label: "Distribución edades",
            data: Object.values(ranges),
            backgroundColor: chartColors
        }]
    }
});



const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom"
        }
    },
    animation: {
        duration: 1000
    }
}

</script>