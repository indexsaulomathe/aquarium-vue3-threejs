import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Fish {
  id: number
  name: string
  type: string
  hunger: number
  hungerMessages: string
  x: number
  y: number
  isCritical: boolean
}

export const useFishStore = defineStore('fishStore', () => {
  const fishesInAquarium = ref<Fish[]>([])

  const addFish = (fish: { name: string; type: string }) => {
    fishesInAquarium.value.push({
      id: Date.now(),
      name: fish.name,
      type: fish.type,
      hunger: 100,
      hungerMessages: '',
      x: 50,
      y: 50,
      isCritical: false
    })
  }

  const updateFishPosition = (fishId: number, newX: number, newY: number) => {
    const fish = fishesInAquarium.value.find((f) => f.id === fishId)
    if (fish) {
      fish.x = newX
      fish.y = newY
    }
  }

  const updateHunger = (fishId: number) => {
    const fish = fishesInAquarium.value.find((f) => f.id === fishId)
    if (fish && fish.hunger > 0) {
      fish.hunger -= 2
    }
  }

  const feedFish = (fishId: number) => {
    const fish = fishesInAquarium.value.find((f) => f.id === fishId)
    if (fish) {
      fish.hunger = 100
      fish.isCritical = false
    }
  }

  return {
    fishesInAquarium,
    addFish,
    updateFishPosition,
    updateHunger,
    feedFish
  }
})
