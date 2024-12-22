import FPSController from "./FPSController.class"
import GameClock from "./GameClock.class"

class GameCommand {
    readonly #fpsController: FPSController
    readonly #gameClock: GameClock
    #isRunning: boolean = false

    #logicStep: () => void = () => {
        throw new Error('Register logic step using `registerLogicStep`')
    }
    
    #drawStep: () => void = () => {
        throw new Error('Register draw step using `registerDrawStep`')
    } 

    constructor(fps: number=0, logicIterval: number=10) {
        this.#isRunning = false
        this.#fpsController = new FPSController(fps)
        this.#gameClock = new GameClock(logicIterval)
    }

    readonly #logicLoop = (): void => {
        if (!this.#isRunning) return undefined
        this.#gameClock.start(this.#logicStep)
    }

    readonly #drawLoop = (newTime: DOMHighResTimeStamp = 0): void => {
        if (!this.#isRunning) return undefined
        window.requestAnimationFrame(this.#drawLoop)

        if(!this.#fpsController.check(newTime)) return undefined
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

const createGameCommand = (options: {
    fps: number,
    logicIterval: number
}): GameCommand => {
    return new GameCommand(
        options.fps,
        options.logicIterval
    )
}

export { createGameCommand, GameCommand }