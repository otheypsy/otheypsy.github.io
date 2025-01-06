import { divMod } from '../utils/math.utils'

import type { ModelConfig } from '../types/ModelConfig.type'
import type { GridConfig } from '../types/GridConfig.type'
import type { RectCoordinates } from '../types/RectCoordinates.type'
import type { TilePosition } from '../types/TilePosition.type'
import type { PixelPosition } from '../types/PixelPosition'

class LevelHelper {
    readonly modelConfig: ModelConfig
    readonly worldConfig: GridConfig

    constructor(config: { modelConfig: ModelConfig; worldConfig: GridConfig }) {
        this.modelConfig = config.modelConfig
        this.worldConfig = config.worldConfig
    }

    getMaxPix = (): PixelPosition => {
        return {
            xPix: this.worldConfig.xMax * this.modelConfig.xPix,
            yPix: (this.worldConfig.count / this.worldConfig.xMax) * this.modelConfig.yPix,
        }
    }

    getTileRect = (x: number, y: number): RectCoordinates => {
        return {
            xPix0: x * this.modelConfig.xPix,
            yPix0: y * this.modelConfig.yPix,
            xPix1: x * this.modelConfig.xPix + this.modelConfig.xPix,
            yPix1: y * this.modelConfig.yPix + this.modelConfig.xPix,
        }
    }

    indexToTile = (index: number): TilePosition => {
        const [y, x] = divMod(index, this.worldConfig.xMax)
        return { x, y }
    }

    tileToIndex = (x: number, y: number): number => {
        return y * this.worldConfig.xMax + x
    }

    tileToPix = (x: number, y: number): PixelPosition => {
        return {
            xPix: x * this.modelConfig.xPix + this.modelConfig.xPix / 2,
            yPix: y * this.modelConfig.yPix + this.modelConfig.yPix / 2,
        }
    }

    pixToTile = (xPix: number, yPix: number): TilePosition => {
        return {
            x: Math.floor(xPix / this.modelConfig.xPix),
            y: Math.floor(yPix / this.modelConfig.yPix),
        }
    }
}

const createLevelHelper = (modelConfig: ModelConfig, worldConfig: GridConfig): LevelHelper => {
    if (
        !Number.isInteger(worldConfig.xMax) ||
        !Number.isInteger(worldConfig.count) ||
        !Number.isInteger(worldConfig.startId)
    )
        throw new Error('createLevelHelper:: worldConfig must be of type GridConfig')
    if (!Number.isInteger(modelConfig.xPix) || !Number.isInteger(modelConfig.yPix))
        throw new Error('createLevelHelper:: modelConfig must be of type ModelConfig')
    return new LevelHelper({ modelConfig, worldConfig })
}

export { createLevelHelper, LevelHelper }
