import type { PixelPosition } from '../types/PixelPosition'

class GameCamera {
    #mapOffset: PixelPosition = { xPix: 0, yPix: 0 }

    setMapOffset = (mapOffset: PixelPosition): void => {
        this.#mapOffset = mapOffset
    }

    getMapOffset = (): PixelPosition => {
        return this.#mapOffset
    }
}

const createCamera = (): GameCamera => {
    return new GameCamera()
}

export { createCamera, GameCamera }
