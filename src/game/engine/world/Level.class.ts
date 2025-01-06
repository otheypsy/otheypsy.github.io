import type { MapRenderer } from '../graphics/MapRenderer.class'
import { LevelHelper } from './LevelHelper.class'
import { LiveTileMap } from './LiveTileMap.class'
import { OffscreenTileMap } from './OffscreenTileMap.class'
import { TileSet } from '../textures/TileSet.class'
import { TileMap } from './TileMap.class'

interface LevelConstructor {
    tileMaps: Record<string, LiveTileMap | OffscreenTileMap>
    tileSet: TileSet
    helper: LevelHelper
}

class Level {
    readonly #tileMaps: Record<string, LiveTileMap | OffscreenTileMap>
    readonly #tileSet: TileSet
    readonly helper: LevelHelper

    constructor(level: LevelConstructor) {
        this.#tileMaps = level.tileMaps
        this.#tileSet = level.tileSet
        this.helper = level.helper
    }

    getTileMap = (zIndex: string): LiveTileMap | OffscreenTileMap | undefined => {
        return this.#tileMaps[zIndex]
    }

    getTileSet = (): TileSet => {
        return this.#tileSet
    }

    drawTileMap = (renderer: MapRenderer, zIndex: string, isDebug = false): void => {
        this.#tileMaps[zIndex].drawTileMap({
            renderer,
            helper: this.helper,
            tileSet: this.#tileSet,
            isDebug,
        })
    }
}

const createLevel = (
    helper: LevelHelper,
    tileMaps: Record<string, LiveTileMap | OffscreenTileMap>,
    tileSet: TileSet,
): Level => {
    if (!(helper instanceof LevelHelper)) throw new Error('createLevel:: helper must be an instance of LevelHelper')
    if (!(tileSet instanceof TileSet)) throw new Error('createLevel:: tileSet must be an instance of TileSet')
    for (const key in tileMaps) {
        if (typeof key !== 'string' || !(tileMaps[key] instanceof TileMap))
            throw new Error('createAnimatedSpriteActor:: animations is not a valid object')
    }
    return new Level({ helper, tileSet, tileMaps })
}

export { createLevel, Level }
