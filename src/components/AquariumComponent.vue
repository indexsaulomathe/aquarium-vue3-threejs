<template>
    <main class="aquarium-container bg-cover bg-center relative w-full h-full"
        :style="{ backgroundImage: `url(${bg})` }">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full h-full">
            <FishComponent v-for="(fish, index) in props.fishes" :key="index" :name="fish.name" :type="fish.type" />
        </div>
    </main>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import FishComponent from '@/components/FishComponent.vue';
import bg from '@/assets/img/bg.jpg';

const props = defineProps<{
    fishes: { name: string; type: string }[];
}>();
</script>

<style scoped>
.aquarium-container {
    background-size: cover;
    background-position: center;
}
</style>
