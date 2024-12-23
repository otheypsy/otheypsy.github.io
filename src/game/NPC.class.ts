import type AnimatedSpriteActor from './engine/actors/AnimatedSpriteActor.class'
import type BaseRenderer from './engine/graphics/BaseRenderer.class'
import type SpeechBubble from './engine/classes/SpeechBubble.class'
import type { PixelPosition } from './engine/types/PixelPosition'

class NPC {
    readonly #name: string
    readonly #actor: AnimatedSpriteActor
    readonly #speechBubble: SpeechBubble
    readonly #dialogue: string | null
    #isNearby: boolean
    #interactHandler: (name: string) => void

    constructor(name: string, actor: AnimatedSpriteActor, speechBubble: SpeechBubble, dialogue:string | null = null) {
        this.#name = name
        this.#actor = actor
        this.#isNearby = false
        this.#speechBubble = speechBubble
        this.#dialogue = dialogue
        this.#interactHandler = () => {
            console.log('Interacted with ' + this.#name)
        }
    }

    getActor(): AnimatedSpriteActor {
        return this.#actor
    }

    setInteractHandler = (callback: (name: string) => void): void => {
        this.#interactHandler = callback
    }

    interact = (): void => {
        if (this.#isNearby) {
            this.#interactHandler(this.#name)
        }
    }

    updateIsNearby = (reference: PixelPosition, threshold: number = 50): void => {
        const { xPix, yPix } = this.#actor.movable.getMapPixPos()
        this.#isNearby =
            xPix > reference.xPix - threshold &&
            xPix < reference.xPix + threshold &&
            yPix > reference.yPix - threshold &&
            yPix < reference.yPix + threshold
    }

    drawSpeechBubble = (renderer: BaseRenderer): void => {
        if (this.#isNearby && this.#dialogue) {
            const { xPix } = this.#actor.movable.getMapPixPos()
            const { yPix0 } = this.#actor.getRect()
            this.#speechBubble.drawUp(renderer, this.#dialogue, xPix, yPix0)
        }
    }
}

export default NPC
