import { TileMap } from './TileMap.class'

import type { MapRenderer } from '../graphics/MapRenderer.class'
import type { TileSet } from '../textures/TileSet.class'
import type { LevelHelper } from './LevelHelper.class'
import type { TileLayer } from '../types/TileLayer.type'

class LiveTileMap extends TileMap {
    readonly layers: TileLayer[] = []

    constructor(layers: TileLayer[]) {
        super()
        for (const layer of layers) {
            this.#addLayer(layer)
        }
    }

    readonly #addLayer = (layer: TileLayer): void => {
        this.layers.push({
            id: layer.id,
            name: layer.name,
            visible: layer.visible,
            opacity: layer.opacity,
            data: layer.data,
        })
    }

    readonly #drawTile = (data: {
        renderer: MapRenderer
        helper: LevelHelper
        tileSet: TileSet
        gid: number
        x: number
        y: number
        isDebug: boolean
    }): void => {
        if (data.gid === 0) return

        const source = data.tileSet.getSource(data.gid)

        const destination = {
            dx: data.x * data.helper.modelConfig.xPix,
            dy: data.y * data.helper.modelConfig.yPix,
            dw: data.helper.modelConfig.xPix,
            dh: data.helper.modelConfig.yPix,
        }

        data.renderer.drawImage({ ...source, ...destination }, data.isDebug)
    }

    drawTileMap = (data: { renderer: MapRenderer; helper: LevelHelper; tileSet: TileSet; isDebug: boolean }): void => {
        const viewport = data.renderer.getCurrentViewport()
        const topLeft = data.helper.pixToTile(viewport.xPix0, viewport.yPix0)
        const bottomRight = data.helper.pixToTile(viewport.xPix1, viewport.yPix1)
        const x0 = Math.max(0, topLeft.x - 1)
        const y0 = Math.max(0, topLeft.y - 1)
        const x1 = Math.min(data.helper.worldConfig.xMax, bottomRight.x + 1)
        const y1 = Math.min(data.helper.worldConfig.count / data.helper.worldConfig.xMax, bottomRight.y + 1)
        for (const layer of this.layers) {
            for (let i = x0; i < x1; i++) {
                for (let j = y0; j < y1; j++) {
                    const index = data.helper.tileToIndex(i, j)
                    if (layer.data[index] !== 0)
                        this.#drawTile({
                            renderer: data.renderer,
                            helper: data.helper,
                            tileSet: data.tileSet,
                            gid: layer.data[index],
                            x: i,
                            y: j,
                            isDebug: data.isDebug,
                        })
                }
            }
        }
    }
}

const createLiveTileMap = (layers: TileLayer[]): LiveTileMap => {
    for (const layer of layers) {
        if (
            (typeof layer.id !== 'string' && typeof layer.id !== 'number') ||
            typeof layer.name !== 'string' ||
            typeof layer.visible !== 'boolean' ||
            typeof layer.opacity !== 'number'
        )
            throw new Error('createAnimatedSpriteActor:: layers must be of type TileLayer[]')
        for (const tile of layer.data) {
            if (!Number.isInteger(tile))
                throw new Error('createAnimatedSpriteActor:: layers must be of type TileLayer[]')
        }
    }
    return new LiveTileMap(layers)
}

export { createLiveTileMap, LiveTileMap }
