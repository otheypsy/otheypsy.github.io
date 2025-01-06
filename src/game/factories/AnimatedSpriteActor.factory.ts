import { createAnimatedSpriteActor, createAggregateTileSet } from '@engine'
import type { AnimatedSpriteActor, AggregateTileSet } from '@engine'

import TileSetFactory from './TileSet.factory'

interface TileSetConfigJSON {
    folderName: string
    fileName: string
    firstgid: number
}

interface CreateNPC {
    gameName: string
    tilesets: object[]
    xPix: number
    yPix: number
    sprites: Record<string, number[]>
}

const handleTileSets = async (
    gameName: string,
    tileSetAggregate: AggregateTileSet,
    tileSets: TileSetConfigJSON[],
): Promise<void> => {
    for (const tileSet of tileSets) {
        const tileSetObj = await TileSetFactory.create({
            gameName,
            folderName: tileSet.folderName,
            fileName: tileSet.fileName,
            startId: tileSet.firstgid,
        })
        tileSetAggregate.addTileSet(tileSetObj)
    }
}

const create = async (npc: CreateNPC): Promise<AnimatedSpriteActor> => {
    const modelConfig = {
        xPix: npc.xPix,
        yPix: npc.yPix,
    }

    const tileSetAggregate = createAggregateTileSet()
    await handleTileSets(npc.gameName, tileSetAggregate, npc.tilesets as TileSetConfigJSON[])

    return createAnimatedSpriteActor(modelConfig, npc.sprites, tileSetAggregate)
}

export default { create }
