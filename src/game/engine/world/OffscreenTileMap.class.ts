import { createGameOffscreenCanvas } from '../graphics/GameOffscreenCanvas.class'
import { createOffscreenRenderer } from '../graphics/OffScreenRenderer.class'
import { TileMap } from './TileMap.class'
import { TileSet } from '../textures/TileSet.class'
import { LevelHelper } from './LevelHelper.class'

import type { MapRenderer } from '../graphics/MapRenderer.class'
import type { TileLayer } from '../types/TileLayer.type'
import type { OffscreenRenderer } from '../graphics/OffScreenRenderer.class'
import type { GameOffscreenCanvas } from '../graphics/GameOffscreenCanvas.class'

interface OffscreenTileMapConstructor {
    helper: LevelHelper
    tileSet: TileSet
    layers: TileLayer[]
    isDebug: boolean
}

class OffscreenTileMap extends TileMap {
    readonly #offscreenCanvas: GameOffscreenCanvas
    readonly layers: TileLayer[] = []

    constructor(options: OffscreenTileMapConstructor) {
        super()
        for (const layer of options.layers) {
            this.#addLayer(layer)
        }
        const renderer = createOffscreenRenderer()
        const width = options.helper.worldConfig.xMax * options.helper.modelConfig.xPix
        const height =
            (options.helper.worldConfig.count / options.helper.worldConfig.xMax) * options.helper.modelConfig.yPix
        this.#offscreenCanvas = createGameOffscreenCanvas(width, height)
        this.#initializeCanvasImage(renderer, options.helper, options.tileSet, options.isDebug)
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
        renderer: OffscreenRenderer
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

        data.renderer.drawImage(this.#offscreenCanvas, { ...source, ...destination }, data.isDebug)
    }

    readonly #initializeCanvasImage = (
        renderer: OffscreenRenderer,
        helper: LevelHelper,
        tileSet: TileSet,
        isDebug: boolean,
    ): void => {
        for (const layer of this.layers) {
            this.#offscreenCanvas.context.save()
            this.#offscreenCanvas.context.globalAlpha = layer.opacity
            layer.data.forEach((gid: number, index: number) => {
                const { x, y } = helper.indexToTile(index)
                this.#drawTile({
                    renderer,
                    helper,
                    tileSet,
                    gid,
                    x,
                    y,
                    isDebug,
                })
            })
            this.#offscreenCanvas.context.restore()
        }
    }

    drawTileMap = (data: { renderer: MapRenderer }): void => {
        const viewport = data.renderer.getCurrentViewport()
        const xPix0 = Math.max(0, viewport.xPix0)
        const yPix0 = Math.max(0, viewport.yPix0)
        const xPix1 = Math.min(this.#offscreenCanvas.element.width, viewport.xPix1)
        const yPix1 = Math.min(this.#offscreenCanvas.element.height, viewport.yPix1)
        data.renderer.drawImage(
            {
                img: this.#offscreenCanvas.element,
                sx: xPix0,
                sy: yPix0,
                sw: xPix1 - xPix0,
                sh: yPix1 - yPix0,
                dx: xPix0,
                dy: yPix0,
                dw: xPix1 - xPix0,
                dh: yPix1 - yPix0,
            },
            false,
        )
    }
}

const createOffscreenTileMap = (
    helper: LevelHelper,
    tileSet: TileSet,
    layers: TileLayer[],
    isDebug = false,
): OffscreenTileMap => {
    if (!(helper instanceof LevelHelper))
        throw new Error('createOffscreenTileMap:: helper must be an instance of LevelHelper')
    if (!(tileSet instanceof TileSet))
        throw new Error('createOffscreenTileMap:: tileSet must be an instance of TileSet')
    for (const layer of layers) {
        if (
            !(typeof layer.id !== 'string' || typeof layer.id !== 'number') ||
            typeof layer.name !== 'string' ||
            typeof layer.visible !== 'boolean' ||
            typeof layer.opacity !== 'number'
        )
            throw new Error('createOffscreenTileMap:: layer must be of type TileLayer')
        for (const tile of layer.data) {
            if (!Number.isInteger(tile)) throw new Error('createOffscreenTileMap:: layers must be of type TileLayer[]')
        }
    }
    return new OffscreenTileMap({ helper, tileSet, layers, isDebug })
}

export { createOffscreenTileMap, OffscreenTileMap }
