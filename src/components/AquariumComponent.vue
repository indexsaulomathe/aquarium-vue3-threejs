<template>
    <main class="aquarium-container bg-cover bg-center relative w-full h-full"
        :style="{ backgroundImage: `url(${bg})` }">
        <div class="relative w-full h-full">
            <FishComponent v-for="fish in fishesInAquarium" :key="fish.id" :id="fish.id" :name="fish.name"
                :type="fish.type" :x="fish.x" :y="fish.y" :hunger="fish.hunger" :hungerMessage="fish.hungerMessages"
                @update-hunger="handleHungerUpdate" @update-position="handlePositionUpdate" />
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import FishComponent from '@/components/FishComponent.vue';
import bg from '@/assets/img/bg.jpg';
import { useFishStore } from '@/stores/fishStore';

const fishStore = useFishStore();
const fishesInAquarium = ref(fishStore.fishesInAquarium);

const handleHungerUpdate = (fishId: number) => {
    fishStore.updateHunger(fishId);
};

const handlePositionUpdate = (fishId: number, newX: number, newY: number) => {
    fishStore.updateFishPosition(fishId, newX, newY);
};

watch(
    () => fishStore.fishesInAquarium,
    (newFishes) => {
        fishesInAquarium.value = newFishes;
    },
    { deep: true }
);
</script>

<style scoped>
.aquarium-container {
    background-size: cover;
    background-position: center;
    position: relative;
    height: 100%;
}
</style>
