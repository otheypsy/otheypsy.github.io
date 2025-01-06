import { createFPSController, type FPSController } from './FPSController.class'
import { createGameClock, type GameClock } from './GameClock.class'

interface GameCommandConstructor {
    fps: number
    logicInterval: number
}

class GameCommand {
    readonly #fpsController: FPSController
    readonly #gameClock: GameClock
    #isRunning = false
    #logicStep: () => void
    #drawStep: () => void

    constructor(options: GameCommandConstructor) {
        this.#isRunning = false
        this.#fpsController = createFPSController(options.fps)
        this.#gameClock = createGameClock(options.logicInterval)
        this.#logicStep = () => {
            throw new Error('Register logic step using `registerLogicStep`')
        }
        this.#drawStep = () => {
            throw new Error('Register draw step using `registerDrawStep`')
        }
    }

    readonly #logicLoop = (): void => {
        if (!this.#isRunning) return undefined
        this.#gameClock.start(this.#logicStep)
    }

    readonly #drawLoop = (newTime: DOMHighResTimeStamp = 0): void => {
        if (!this.#isRunning) return undefined
        window.requestAnimationFrame(this.#drawLoop)

        if (!this.#fpsController.check(newTime)) return undefined
        this.#drawStep()
    }

    registerLogicStep = (fn: () => void): void => {
        this.#logicStep = fn
    }

    registerDrawStep = (fn: () => void): void => {
        this.#drawStep = fn
    }

    step = (): void => {
        this.#logicStep()
        this.#drawStep()
    }

    start = (): void => {
        this.#isRunning = true
        this.#logicLoop()
        this.#drawLoop()
    }

    stop = (): void => {
        this.#isRunning = false
        this.#gameClock.stop()
    }
}

const createGameCommand = (fps: number, logicInterval: number): GameCommand => {
    if (!Number.isInteger(fps)) throw new Error('createGameCommand:: fps must be an integer')
    if (fps < 1) throw new Error('createGameCommand:: fps must be postive')
    if (!Number.isInteger(logicInterval)) throw new Error('createGameCommand:: interval must be an integer')
    if (logicInterval <= 9) throw new Error('createGameCommand:: interval must be more than 9')
    return new GameCommand({ fps, logicInterval })
}

export { createGameCommand, GameCommand }
