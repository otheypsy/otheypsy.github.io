/**
 * Interface representing the constructor for a sprite animation.
 */
interface SpriteAnimationConstructor {
    /**
     * A record of animation names to their corresponding frame indices.
     * The key is the animation name, and the value is an array of frame indices.
     */
    animations: Record<string, number[]>

    /**
     * The delay between animation frames in milliseconds.
     */
    animationDelay: number
}

/**
 * Class representing a sprite animation.
 */
class SpriteAnimation {
    readonly #animations: Record<string, number[]>
    #animationDelay: number
    #frame: number
    #animationType: string

    constructor(options: SpriteAnimationConstructor) {
        this.#animations = options.animations
        this.#animationType = Object.keys(options.animations)[0]
        this.#frame = 0
        this.#animationDelay = options.animationDelay
    }

    /**
     * Sets the animation delay.
     * @param animationDelay - The delay between animation frames.
     */
    setAnimationDelay = (animationDelay: number): void => {
        this.#animationDelay = animationDelay
    }

    /**
     * Gets the animation delay.
     * @returns The delay between animation frames.
     */
    getAnimationDelay = (): number => {
        return this.#animationDelay
    }

    /**
     * Advances the animation by one frame.
     * @param type - The type of animation to play. If null, continues the current animation.
     */
    animate(type: string | null = null): void {
        if (type != null) this.#animationType = type
        const wrap = this.#animations[this.#animationType].length
        this.#frame = (this.#frame + 1) % (wrap * this.#animationDelay)
    }

    /**
     * Gets the current frame's graphic ID (GID).
     * @returns The GID of the current frame.
     */
    getGid(): number {
        const index = Math.floor(this.#frame / this.#animationDelay)
        return this.#animations[this.#animationType][index] ?? 0
    }
}

/**
 * Creates a new SpriteAnimation instance with the provided animations and animation delay.
 * @param animations - A record where the keys are animation names and the values are arrays of frame indices.
 * @param animationDelay - The delay between animation frames in milliseconds. Must be an integer greater than 9. Defaults to 10.
 * @returns A new SpriteAnimation instance.
 * @throws Will throw an error if `animations` is not a valid object or if `animationDelay` is not an integer greater than 9.
 */
const createSpriteAnimation = (animations: Record<string, number[]>, animationDelay = 10): SpriteAnimation => {
    for (const key in animations) {
        if (typeof key !== 'string' || !Array.isArray(animations[key]))
            throw new Error('createAnimatedSpriteActor:: animations is not a valid object')
    }
    if (!Number.isInteger(animationDelay))
        throw new Error('createAnimatedSpriteActor:: animationDelay must be an integer')
    if (animationDelay <= 9) throw new Error('createAnimatedSpriteActor:: animationDelay must be more than 9')
    return new SpriteAnimation({
        animations: animations,
        animationDelay: animationDelay,
    })
}

export { createSpriteAnimation, SpriteAnimation }
