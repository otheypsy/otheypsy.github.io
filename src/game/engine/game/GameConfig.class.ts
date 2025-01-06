class GameConfig {
    #scale = 1
    #fps = 120

    setScale = (scale: number): void => {
        this.#scale = scale
    }

    getScale = (): number => {
        return this.#scale
    }

    setFPS = (fps: number): void => {
        this.#fps = fps
    }

    getFPS = (): number => {
        return this.#fps
    }
}

const createGameConfig = (): GameConfig => {
    return new GameConfig()
}

export { createGameConfig, GameConfig }
