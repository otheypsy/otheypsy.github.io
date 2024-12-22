class GameConfig {
    #scale: number = 1
    #fps: number = 120

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

export default GameConfig
