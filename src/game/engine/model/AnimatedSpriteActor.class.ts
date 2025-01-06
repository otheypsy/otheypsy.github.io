import { createMapMovable, type MapMovable } from '../abstract/MapMovable.class'
import { createSpriteAnimation, type SpriteAnimation } from './SpriteAnimation.class'

import type { ModelConfig } from '../types/ModelConfig.type'
import type { MapRenderer } from '../graphics/MapRenderer.class'
import { TileSet } from '../textures/TileSet.class'
import type { Actor } from '../types/Actor.type'
import type { RectCoordinates } from '../types/RectCoordinates.type'

interface AnimatedSpriteActorContructor {
    animation: SpriteAnimation
    modelConfig: ModelConfig
    movable: MapMovable
    tileSet: TileSet
}

class AnimatedSpriteActor implements Actor {
    readonly animation: SpriteAnimation
    readonly movable: MapMovable
    readonly #tileSet: TileSet
    readonly #modelConfig: ModelConfig

    constructor(actor: AnimatedSpriteActorContructor) {
        this.animation = actor.animation
        this.#modelConfig = actor.modelConfig
        this.movable = actor.movable
        this.#tileSet = actor.tileSet
    }

    getRect = (): RectCoordinates => {
        return {
            xPix0: this.movable.mapPixPos.xPix - this.#modelConfig.xPix / 2,
            yPix0: this.movable.mapPixPos.yPix - this.#modelConfig.yPix / 2,
            xPix1: this.movable.mapPixPos.xPix + this.#modelConfig.xPix / 2,
            yPix1: this.movable.mapPixPos.yPix + this.#modelConfig.yPix / 2,
        }
    }

    draw = (renderer: MapRenderer, isDebug = false): void => {
        const source = this.#tileSet.getSource(this.animation.getGid())

        const destination = {
            dx: this.movable.mapPixPos.xPix - this.#modelConfig.xPix / 2,
            dy: this.movable.mapPixPos.yPix - this.#modelConfig.yPix / 2,
            dw: this.#modelConfig.xPix,
            dh: this.#modelConfig.yPix,
        }

        renderer.drawImage({ ...source, ...destination }, isDebug)
    }
}

const createAnimatedSpriteActor = (
    modelConfig: ModelConfig,
    animationSprites: Record<string, number[]>,
    tileSet: TileSet,
): AnimatedSpriteActor => {
    if (!Number.isInteger(modelConfig.xPix) || !Number.isInteger(modelConfig.yPix))
        throw new Error('createAnimatedSpriteActor:: modelConfig must be of type ModelConfig')
    for (const key in animationSprites) {
        if (typeof key !== 'string' || !Array.isArray(animationSprites[key]))
            throw new Error('createAnimatedSpriteActor:: animationSprites is not a valid object')
    }
    if (!(tileSet instanceof TileSet))
        throw new Error('createAnimatedSpriteActor:: tileSet must be an instance of TileSet')
    const movable = createMapMovable()
    const animation = createSpriteAnimation(animationSprites)
    return new AnimatedSpriteActor({ animation, modelConfig, movable, tileSet })
}

export { createAnimatedSpriteActor, AnimatedSpriteActor }
