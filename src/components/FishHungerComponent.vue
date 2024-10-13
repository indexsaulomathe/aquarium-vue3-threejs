<template>
    <div class="hunger-bar mt-2 bg-gray-300 rounded relative overflow-hidden">
        <div class="h-2 rounded absolute left-0 top-0 transition-all duration-500 ease-linear"
            :style="{ width: hungerWidth, backgroundColor: hungerColor }"></div>
    </div>
    <p class="hunger-message text-sm text-center mt-1" :style="{ color: hungerMessageColor }">{{ hungerMessage }}</p>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'FishHungerComponent',
    props: {
        hunger: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const hungerColor = computed(() => {
            if (props.hunger > 60) return '#22c55e';
            if (props.hunger > 40) return '#facc15';
            if (props.hunger > 20) return '#fb923c';
            return '#ef4444';
        });

        const hungerWidth = computed(() => `${props.hunger}%`);

        const hungerMessage = computed(() => {
            if (props.hunger > 80) return 'I am feeling full!';
            if (props.hunger > 60) return 'I am getting a bit hungry!';
            if (props.hunger > 40) return 'I am very hungry!';
            if (props.hunger > 20) return 'These fish look delicious!!';
            if (props.hunger > 0) return 'I am starving!';
            return 'I will haunt you forever!!';
        });

        const hungerMessageColor = computed(() => {
            if (props.hunger > 60) return '#22c55e';
            if (props.hunger > 40) return '#facc15';
            if (props.hunger > 20) return '#fb923c';
            return '#ef4444';
        });

        return { hungerColor, hungerWidth, hungerMessage, hungerMessageColor };
    },
});
</script>

<style scoped>
.hunger-bar {
    width: 100%;
    height: 10px;
    background-color: #e5e7eb;
    position: relative;
}

.hunger-message {
    transition: color 0.3s ease;
}
</style>
