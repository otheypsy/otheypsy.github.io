import { divMod } from '../utils/math.utils'
import { TileSet } from './TileSet.class'

import type { ModelConfig } from '../types/ModelConfig.type'
import type { GridConfig } from '../types/GridConfig.type'
import type { DrawImageSource } from '../types/DrawImageSource.type'

interface TileSetConstructor {
    image: HTMLImageElement
    gridConfig: GridConfig
    modelConfig: ModelConfig
}

class BasicTileSet extends TileSet {
    readonly #image: HTMLImageElement
    readonly #gridConfig: GridConfig
    readonly #modelConfig: ModelConfig

    constructor(tileSet: TileSetConstructor) {
        super()
        this.#image = tileSet.image
        this.#gridConfig = tileSet.gridConfig
        this.#modelConfig = tileSet.modelConfig
    }

    getGridConfig(): GridConfig {
        return this.#gridConfig
    }

    getSource = (gid: number): DrawImageSource => {
        const [spriteY, spriteX] = divMod(gid - this.#gridConfig.startId, this.#gridConfig.xMax)

        const sx = spriteX * this.#modelConfig.xPix
        const sy = spriteY * this.#modelConfig.yPix
        const sw = this.#modelConfig.xPix
        const sh = this.#modelConfig.yPix

        return { img: this.#image, sx, sy, sw, sh }
    }
}

const createBasicTileSet = (
    image: HTMLImageElement,
    gridConfig: GridConfig,
    modelConfig: ModelConfig,
): BasicTileSet => {
    if (!(image instanceof HTMLImageElement))
        throw new Error('createBasicTileSet:: image must be an instance of HTMLImageElement')
    if (
        !Number.isInteger(gridConfig.xMax) ||
        !Number.isInteger(gridConfig.count) ||
        !Number.isInteger(gridConfig.startId)
    )
        throw new Error('createBasicTileSet:: gridConfig must be of type GridConfig')
    if (!Number.isInteger(modelConfig.xPix) || !Number.isInteger(modelConfig.yPix))
        throw new Error('createBasicTileSet:: modelConfig must be of type ModelConfig')
    return new BasicTileSet({ image, gridConfig, modelConfig })
}

export { createBasicTileSet, BasicTileSet }
