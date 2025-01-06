class GameClock {
    readonly #interval: number
    #instance = 0

    constructor(interval = 10) {
        this.#interval = interval
    }

    start = (fn: () => void): void => {
        this.stop()
        this.#instance = window.setInterval(fn, this.#interval)
    }

    stop = (): void => {
        window.clearInterval(this.#instance)
    }
}

const createGameClock = (interval = 10): GameClock => {
    if (!Number.isInteger(interval)) throw new Error('createGameClock:: interval must be an integer')
    if (interval <= 9) throw new Error('createGameClock:: interval must be more than 9')
    return new GameClock(interval)
}

export { createGameClock, GameClock }
