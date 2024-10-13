<template>
    <div class="fish" :style="fishStyle">
        <p class="fish-name text-center font-bold mb-1">{{ name }}</p>
        <FishImageComponent :type="type" :hunger="hunger" :directionX="directionX" :name="name" />
        <FishHungerComponent :hunger="hunger" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, type CSSProperties } from 'vue';
import FishImageComponent from './FishImageComponent.vue';
import FishHungerComponent from './FishHungerComponent.vue';
import { updateFishMovementAndHunger, type Direction } from '@/utils/movementUtils';

export default defineComponent({
    name: 'FishComponent',
    components: { FishImageComponent, FishHungerComponent },
    props: {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
        size: {
            type: Number,
            default: 100,
        },
        hunger: {
            type: Number,
            required: true,
        },
    },
    emits: ['update-hunger', 'update-position'],
    setup(props, { emit }) {
        const direction = ref<Direction>({ x: Math.random() > 0.5 ? 1 : -1, y: Math.random() > 0.5 ? 1 : -1 });

        const directionX = computed(() => direction.value.x);

        const fishStyle = computed<CSSProperties>(() => ({
            width: `${props.size}px`,
            height: `${props.size}px`,
            top: `${props.y}%`,
            left: `${props.x}%`,
            position: 'absolute',
            transition: 'top 1s linear, left 1s linear',
            transform: `translate(-50%, -50%)`,
        }));

        const handleMovementAndHunger = () => {
            if (props.hunger > 0) {
                const { newX, newY, newDirection, newHunger } = updateFishMovementAndHunger({
                    x: props.x,
                    y: props.y,
                    hunger: props.hunger,
                    direction: direction.value,
                    bounds: { xMin: 0, xMax: 80, yMin: 0, yMax: 80 },
                    step: 3,
                });

                direction.value = newDirection;

                emit('update-position', props.id, newX, newY);
                emit('update-hunger', props.id, newHunger);
            }
        };

        onMounted(() => {
            const intervalId = setInterval(() => {
                handleMovementAndHunger();
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        });

        return { fishStyle, directionX };
    },
});
</script>

<style scoped>
.fish-name {
    color: #333;
}
</style>
