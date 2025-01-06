class FPSController {
    readonly #fpsInterval: number
    #oldTime: number

    constructor(fps: number) {
        this.#fpsInterval = fps === 0 ? 1 : 1000 / fps
        this.#oldTime = window.performance.now()
    }

    check = (newTime: DOMHighResTimeStamp): boolean => {
        const elapsed = newTime - this.#oldTime
        if (elapsed >= this.#fpsInterval) {
            this.#oldTime = newTime - (elapsed % this.#fpsInterval)
            return true
        }
        return false
    }
}

const createFPSController = (fps: number): FPSController => {
    if (!Number.isInteger(fps)) throw new Error('createFPSController:: fps must be an integer')
    if (fps < 1) throw new Error('createFPSController:: fps must be postive')
    return new FPSController(fps)
}

export { createFPSController, FPSController }
