export interface Direction {
  x: number
  y: number
}

export interface MovementOptions {
  x: number
  y: number
  hunger: number
  direction: Direction
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number }
  step: number
}

export function updateFishMovementAndHunger(options: MovementOptions): {
  newX: number
  newY: number
  newDirection: Direction
  newHunger: number
} {
  const { x, y, hunger, direction, bounds, step } = options

  let newX = x + direction.x * step
  let newY = y + direction.y * step
  const newHunger = Math.max(hunger - 1, 0)

  const updatedDirectionX = newX <= bounds.xMin || newX >= bounds.xMax ? -direction.x : direction.x
  const updatedDirectionY = newY <= bounds.yMin || newY >= bounds.yMax ? -direction.y : direction.y

  newX = x + updatedDirectionX * step
  newY = y + updatedDirectionY * step

  return {
    newX,
    newY,
    newDirection: { x: updatedDirectionX, y: updatedDirectionY },
    newHunger
  }
}
