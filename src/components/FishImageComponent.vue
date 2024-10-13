<template>
    <img :src="fishImage" :alt="name" class="fish-image" :style="imageDirectionStyle" />
</template>

<script lang="ts">
import { defineComponent, computed, type CSSProperties } from 'vue';
import goldfish from '@/assets/img/goldfish.png';
import guppie from '@/assets/img/guppie.png';
import tropicalFish from '@/assets/img/tropical-fish.png';
import tuna from '@/assets/img/tuna.png';
import deadFish from '@/assets/img/dead.png';
import goldPurpleFish from '@/assets/img/golden-purple-fish.png';

export default defineComponent({
    name: 'FishImageComponent',
    props: {
        type: {
            type: String,
            required: true,
        },
        hunger: {
            type: Number,
            required: true,
        },
        directionX: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const fishImage = computed(() => {
            if (props.hunger <= 0) {
                return deadFish;
            }
            switch (props.type) {
                case 'goldfish':
                    return goldfish;
                case 'guppie':
                    return guppie;
                case 'tropical':
                    return tropicalFish;
                case 'tuna':
                    return tuna;
                case 'gold-purple':
                    return goldPurpleFish;
                default:
                    return goldfish;
            }
        });

        const imageDirectionStyle = computed<CSSProperties>(() => ({
            transform: props.directionX === 1 ? 'scaleX(1)' : 'scaleX(-1)',
        }));

        return { fishImage, imageDirectionStyle };
    },
});
</script>

<style scoped>
.fish-image {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
}

.fish-image:hover {
    transform: scale(1.1);
}
</style>
