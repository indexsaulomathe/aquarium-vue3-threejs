<template>
    <div class="feed-button fixed z-10 bg-gradient-to-r from-orange-400 to-orange-500 text-white w-5 h-5 md:w-10 md:h-10 lg:w-15 lg:h-15 rounded-full flex justify-center items-center cursor-pointer shadow-xl transform hover:scale-110 transition-all duration-300"
        @mousedown="startDragging" :style="{ top: `${position.y}px`, left: `${position.x}px` }" ref="feedButton"
        :title="!isDragging ? 'Drag to feed fish' : ''">

        <span v-if="!isDragging"
            class="absolute -translate-y-10 md:-translate-y-10 text-xs md:text-sm font-bold text-white-800">
            FISH FOOD
        </span>

        <span class="text-2xl">🍖</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { useFishStore } from '@/stores/fishStore';

export default defineComponent({
    name: 'FeedButtonComponent',
    setup() {
        const isDragging = ref(false);
        const position = ref({ x: 100, y: 100 });
        const containerBounds = ref({ xMin: 0, xMax: window.innerWidth, yMin: 0, yMax: window.innerHeight });
        const fishStore = useFishStore();

        const startDragging = () => {
            isDragging.value = true;
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDragging);
        };

        const onDrag = (event: MouseEvent) => {
            if (isDragging.value) {
                const newX = Math.min(
                    Math.max(event.pageX - 25, containerBounds.value.xMin),
                    containerBounds.value.xMax - 50
                );
                const newY = Math.min(
                    Math.max(event.pageY - 25, containerBounds.value.yMin),
                    containerBounds.value.yMax - 50
                );
                position.value = { x: newX, y: newY };
            }
        };

        const stopDragging = (event: MouseEvent) => {
            isDragging.value = false;
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDragging);
            checkIfOverFish(event);
        };

        const checkIfOverFish = (event: MouseEvent) => {
            const fishElements = document.querySelectorAll('.fish');
            fishElements.forEach((fishElement) => {
                const fishRect = fishElement.getBoundingClientRect();
                const feedButtonRect = (event.target as HTMLElement).getBoundingClientRect();

                const isOverlapping = !(
                    feedButtonRect.right < fishRect.left ||
                    feedButtonRect.left > fishRect.right ||
                    feedButtonRect.bottom < fishRect.top ||
                    feedButtonRect.top > fishRect.bottom
                );

                if (isOverlapping) {
                    const fishId = fishElement.getAttribute('data-fish-id');
                    if (fishId) {
                        fishStore.feedFish(parseInt(fishId, 10));
                    }
                }
            });
        };

        const updateContainerBounds = () => {
            containerBounds.value = {
                xMin: 0,
                xMax: window.innerWidth,
                yMin: 0,
                yMax: window.innerHeight,
            };
        };

        onMounted(() => {
            window.addEventListener('resize', updateContainerBounds);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', updateContainerBounds);
        });

        return { position, isDragging, startDragging };
    },
});
</script>

<style scoped>
.feed-button {
    transition: transform 0.3s ease;
}

.feed-button:hover {
    transform: scale(1.15);
}
</style>
