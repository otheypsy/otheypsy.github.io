import Level from '../engine/level/Level.class'
import AggregateTileSet from '../engine/tilesets/AggregateTileSet.class'
import LiveTileMap from '../engine/level/LiveTileMap.class'
import LevelHelper from '../engine/level/LevelHelper.class'
import TileSetFactory from './TileSet.factory'
import OffscreenTileMap from '../engine/level/OffscreenTileMap.class'
import { TileLayer } from '../engine/types/TileLayer.type'

interface CreateLevel {
    gameName: string
    xMax: number
    yMax: number
    xPixUnit: number
    yPixUnit: number
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
    properties: {
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

type FinalLayers = Record<number, {
    layers: object[],
    zIndex: number
}>

const handleLayer = (finalLayers: FinalLayers, layer: LayerConfig): void => {
    const zIndexProperty = layer?.properties?.find(property => property.name === 'zIndex')
    const zIndex = zIndexProperty ? zIndexProperty.value : -1
    if (!Object.hasOwn(finalLayers, zIndex)) {
        finalLayers[zIndex as number] = {
            zIndex: (zIndex as number),
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

const handleTileSets = async (gameName:string, tileSetAggregate: AggregateTileSet, tileSets: TileSetConfig[]): Promise<void> => {
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

    const pixelConfig = {
        xPixUnit: level.xPixUnit,
        yPixUnit: level.yPixUnit,
    }

    const tileConfig = {
        xMax,
        count: xMax * yMax,
        startId: 0,
    }

    const helper = new LevelHelper({ pixelConfig, tileConfig })
    const tileSet = new AggregateTileSet()
    await handleTileSets(level.gameName, tileSet, level.tilesets as TileSetConfig[])

    const layers = sanitizeLayers(level.layers as LayerConfig[])
    const tileMaps: Record<string, LiveTileMap | OffscreenTileMap> = {}
    for(const zIndex in layers) {
        const tileMap = (level?.isLive === true)
            ? new LiveTileMap(layers[zIndex].layers as TileLayer[])
            : new OffscreenTileMap(helper, tileSet, layers[zIndex].layers as TileLayer[])  
        tileMaps[zIndex] = tileMap
    }

    return new Level({
        tileMaps,
        tileSet,
        helper,
    })
}

export default { create }
