<template>
    <v-container>
        <v-carousel>
            <v-carousel-item v-for="n in 6" :key="n">
                <v-img  src="https://picsum.photos/1500/500" cover />
            </v-carousel-item>
        </v-carousel>
    </v-container>
</template>