<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '@/components/SidebarComponent.vue';
import Aquarium from '@/components/AquariumComponent.vue';

const fishTypes = [
  { type: 'goldfish', image: '@/assets/img/goldfish.png' },
  { type: 'guppie', image: '@/assets/img/guppie.png' },
  { type: 'tropical', image: '@/assets/img/tropical-fish.png' },
  { type: 'tuna', image: '@/assets/img/tuna.png' },
  { type: 'gold-purple', image: '@/assets/img/golden-purple-fish.png' },
  { type: 'dead', image: '@/assets/img/dead.png' },
];

const fishesInAquarium = ref<{ name: string; type: string }[]>([]);

const addFishToAquarium = (fish: { name: string; type: string }) => {
  fishesInAquarium.value.push(fish);
};
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 h-screen gap-1 bg-blue-900">
    <div class="col-span-1 bg-blue-900 shadow-lg p-4 rounded-lg flex flex-col justify-center items-center">
      <Sidebar :fishTypes="fishTypes" :onAddFish="addFishToAquarium" />
    </div>

    <div class="col-span-4 bg-white shadow rounded-lg flex justify-center items-center">
      <Aquarium :fishes="fishesInAquarium">
      </Aquarium>
    </div>
  </div>
</template>
