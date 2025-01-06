import type { Level } from '../world/Level.class'
import type { RectCoordinates } from '../types/RectCoordinates.type'
import type { Actor } from '../types/Actor.type'
import type { Direction } from '../types/Direction.type'

/*
Selecting Collision Tiles -- OLD
THIS MIGHT HAVE NON-REQUIRED LOOPS
return this.#collisionTiles.reduce((aggregate, collision): object[] => {
    const [y, x] = divMod(collision, this.#worldConfig.xMax)
    if (
        x > actorTilePosition.x - 3 &&
        x < actorTilePosition.x + 4 &&
        y > actorTilePosition.y - 3 &&
        y < actorTilePosition.y + 4
    ) {
        return [
            ...aggregate,
            {
                x0: x * this.#modelConfig.xPix,
                y0: y * this.#modelConfig.yPix,
                x1: x * this.#modelConfig.xPix + this.#modelConfig.xPix,
                y1: y * this.#modelConfig.yPix + this.#modelConfig.xPix,
            },
        ]
    }
    return aggregate
}, [])

 */

class LevelCollisionDetector {
    readonly #checkCollision = (rect1: RectCoordinates, rect2: RectCoordinates): boolean => {
        // Check if Rect-1 Area is zero
        if (rect1.xPix0 === rect1.xPix1 || rect1.yPix0 === rect1.yPix1) return false

        // Check if Rect-2 Area is zero
        if (rect2.xPix0 === rect2.xPix1 || rect2.yPix0 === rect2.yPix1) return false

        // Horizontal Check
        if (rect1.xPix0 >= rect2.xPix1 || rect2.xPix0 >= rect1.xPix1) return false

        // Vertical Check
        if (rect1.yPix0 >= rect2.yPix1 || rect2.yPix0 >= rect1.yPix1) return false

        return true
    }

    checkCollision = (level: Level, actor: Actor, direction: Direction, offset = 1): boolean => {
        const collisions = level.getTileMap('0')
        if (!collisions) return false
        const currentPix = actor.movable.getMapPixPos()
        const finalOffset = offset * actor.movable.getMoveSpeed()
        const { x, y } = level.helper.pixToTile(currentPix.xPix, currentPix.yPix)
        for (let i = x - 3; i <= x + 3; i++) {
            for (let j = y - 3; j <= y + 3; j++) {
                for (const layer of collisions.layers) {
                    const index = level.helper.tileToIndex(i, j)
                    if (layer.data[index]?.toString() !== '0') {
                        const actorRect = actor.getRect()
                        const collisionRect = level.helper.getTileRect(i, j)
                        actorRect.xPix0 += finalOffset * direction.xOffset
                        actorRect.xPix1 += finalOffset * direction.xOffset
                        actorRect.yPix0 += finalOffset * direction.yOffset
                        actorRect.yPix1 += finalOffset * direction.yOffset
                        if (this.#checkCollision(actorRect, collisionRect)) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }
}

const createLevelCollisionDetector = (): LevelCollisionDetector => {
    return new LevelCollisionDetector()
}

export { createLevelCollisionDetector, LevelCollisionDetector }
