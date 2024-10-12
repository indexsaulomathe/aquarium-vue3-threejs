<template>
    <aside class="p-6 bg-gray-100 shadow-md rounded-lg w-full max-w-xs mx-auto lg:mx-0 lg:w-64">
        <h2 class="text-xl lg:text-2xl font-semibold text-center mb-6 text-gray-700">Select a Fish</h2>

        <div class="grid grid-cols-2 gap-4">
            <div v-for="(fish, index) in fishTypes" :key="index" @click="selectFish(fish.type)"
                class="cursor-pointer border border-gray-500 p-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-gray-300">
                <img :src="fish.image" :alt="fish.type" class="w-full h-auto object-cover rounded-md" />
            </div>
        </div>

        <div class="mt-8">
            <label for="fishName" class="block text-lg text-gray-700">Fish Name:</label>
            <input id="fishName" v-model="fishName" type="text"
                class="border border-gray-300 p-3 rounded w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter fish name" required />
        </div>

        <button @click="addFish"
            class="bg-red-600 text-white px-4 py-2 mt-6 rounded w-full hover:bg-red-700 transition-all"
            :disabled="!selectedFishType || !fishName">
            Add Fish
        </button>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import goldfishImg from '@/assets/img/goldfish.png';
import guppieImg from '@/assets/img/guppie.png';
import tropicalFishImg from '@/assets/img/tropical-fish.png';
import tunaImg from '@/assets/img/tuna.png';
import goldPurpleFishImg from '@/assets/img/golden-purple-fish.png';
import deadFishImg from '@/assets/img/dead.png';

const fishTypes = [
    { type: 'goldfish', image: goldfishImg },
    { type: 'guppie', image: guppieImg },
    { type: 'tropical', image: tropicalFishImg },
    { type: 'tuna', image: tunaImg },
    { type: 'gold-purple', image: goldPurpleFishImg },
    { type: 'dead', image: deadFishImg },
];

const props = defineProps<{
    onAddFish: (fish: { name: string; type: string }) => void;
}>();

const selectedFishType = ref('');
const fishName = ref('');

const selectFish = (type: string) => {
    selectedFishType.value = type;
};

const addFish = () => {
    if (selectedFishType.value && fishName.value) {
        props.onAddFish({
            name: fishName.value,
            type: selectedFishType.value,
        });
        fishName.value = '';
        selectedFishType.value = '';
    }
};
</script>
