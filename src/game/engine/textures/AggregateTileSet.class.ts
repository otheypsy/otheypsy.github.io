import { TileSet } from './TileSet.class'

import type { BasicTileSet } from './BasicTileSet.class'
import type { DrawImageSource } from '../types/DrawImageSource.type'

class AggregateTileSet extends TileSet {
    readonly #tileSets: BasicTileSet[] = []
    addTileSet = (tileSet: BasicTileSet): void => {
        this.#tileSets.push(tileSet)
    }

    getSource = (gid: number): DrawImageSource => {
        const tileSet = this.#tileSets.find((item) => {
            const { startId, count } = item.getGridConfig()
            return gid < count + startId && gid >= startId
        }) as TileSet
        return tileSet.getSource(gid)
    }
}

const createAggregateTileSet = (): AggregateTileSet => {
    return new AggregateTileSet()
}

export { createAggregateTileSet, AggregateTileSet }
