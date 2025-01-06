import {
    createLevel,
    createAggregateTileSet,
    createLevelHelper,
    createLiveTileMap,
    createOffscreenTileMap,
} from '@engine'
import type { Level, AggregateTileSet, LiveTileMap, OffscreenTileMap } from '@engine'

import TileSetFactory from './TileSet.factory'

interface CreateLevel {
    gameName: string
    xMax: number
    yMax: number
    tileWidth: number
    tileHeight: number
    layers: object[]
    tilesets: object[]
    isLive?: boolean
}

interface TileSetConfig {
    firstgid: number
    name: string
}

interface LayerConfig {
    height: number
    id: number
    name: string
    opacity: number
    properties?: {
        name: string
        [index: string]: string
    }[]
    type: string
    visible: boolean
    width: number
    x: number
    y: number
    zIndex: number
    layers: LayerConfig[]
}

type FinalLayers = Record<
    number,
    {
        layers: object[]
        zIndex: number
    }
>

const handleLayer = (finalLayers: FinalLayers, layer: LayerConfig): void => {
    const zIndexProperty = layer.properties?.find((property) => property.name === 'zIndex')
    const zIndex = zIndexProperty ? zIndexProperty.value : -1
    if (!Object.hasOwn(finalLayers, zIndex)) {
        finalLayers[zIndex as number] = {
            zIndex: zIndex as number,
            layers: [layer],
        }
    } else {
        finalLayers[zIndex as number].layers.push(layer)
    }
}

const handleLayers = (finalLayers: FinalLayers, layers: LayerConfig[]): FinalLayers => {
    for (const layer of layers) {
        switch (layer.type) {
            case 'group': {
                handleLayers(finalLayers, layer.layers)
                break
            }
            case 'tilelayer': {
                handleLayer(finalLayers, layer)
                break
            }
            default: {
                break
            }
        }
    }
    return finalLayers
}

const sanitizeLayers = (layers: LayerConfig[]): FinalLayers => {
    const finalLayers: FinalLayers = {}
    return handleLayers(finalLayers, layers)
}

const handleTileSets = async (
    gameName: string,
    tileSetAggregate: AggregateTileSet,
    tileSets: TileSetConfig[],
): Promise<void> => {
    for (const tileSet of tileSets) {
        const name = tileSet.name.split('.')[0]
        const tileSetObj = await TileSetFactory.create({
            gameName,
            folderName: name,
            fileName: name,
            startId: tileSet.firstgid,
        })
        tileSetAggregate.addTileSet(tileSetObj)
    }
}

const create = async (level: CreateLevel): Promise<Level> => {
    const xMax = level.xMax
    const yMax = level.yMax

    const modelConfig = {
        xPix: level.tileWidth,
        yPix: level.tileHeight,
    }

    const worldConfig = {
        xMax,
        count: xMax * yMax,
        startId: 0,
    }

    const helper = createLevelHelper(modelConfig, worldConfig)
    const tileSet = createAggregateTileSet()
    await handleTileSets(level.gameName, tileSet, level.tilesets as TileSetConfig[])

    const layers = sanitizeLayers(level.layers as LayerConfig[])
    const tileMaps: Record<string, LiveTileMap | OffscreenTileMap> = {}
    for (const zIndex in layers) {
        const currentLayers = layers[zIndex].layers as {
            id: string
            name: string
            visible: boolean
            opacity: number
            data: number[]
        }[]
        const tileMap =
            level.isLive === true
                ? createLiveTileMap(currentLayers)
                : createOffscreenTileMap(helper, tileSet, currentLayers)
        tileMaps[zIndex] = tileMap
    }

    return createLevel(helper, tileMaps, tileSet)
}

export default { create }
