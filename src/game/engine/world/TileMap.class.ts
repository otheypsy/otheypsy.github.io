import { MapRenderer } from '../graphics/MapRenderer.class'
import { LevelHelper } from './LevelHelper.class'
import { TileSet } from '../textures/TileSet.class'

interface DrawTileMap {
    renderer: MapRenderer
    helper: LevelHelper
    tileSet: TileSet
    isDebug: boolean
}

class TileMap {
    constructor() {
        if (new.target === TileMap) {
            throw new Error('TileMap:: TileMap an abstract class.')
        }
    }

    drawTileMap = (data: DrawTileMap): void => {
        console.log('TileMap:: drawTileMap', data)
    }
}

export { TileMap }
