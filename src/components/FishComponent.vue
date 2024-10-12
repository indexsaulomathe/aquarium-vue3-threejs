<template>
    <div class="fish" :style="fishStyle">
        <img :src="fishImage" :alt="name" class="fish-image" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import goldfish from '@/assets/img/goldfish.png';
import guppie from '@/assets/img/guppie.png';
import tropicalFish from '@/assets/img/tropical-fish.png';
import tuna from '@/assets/img/tuna.png';
import deadFish from '@/assets/img/dead.png';
import goldPurpleFish from '@/assets/img/golden-purple-fish.png';

export default defineComponent({
    name: 'FishComponent',
    props: {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            default: 100,
        },
    },
    setup(props) {
        const fishImage = computed(() => {
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
                case 'dead':
                    return deadFish;
                default:
                    return goldfish;
            }
        });

        const fishStyle = computed(() => ({
            width: `${props.size}px`,
            height: `${props.size}px`,
            animation: 'swim 10s linear infinite',
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
        }));

        return { fishImage, fishStyle };
    },
});
</script>

<style scoped>
.fish-image {
    width: 100%;
    height: auto;
}

@keyframes swim {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(100vw);
    }
}
</style>
