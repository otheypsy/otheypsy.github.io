import { GameCanvas } from './GameCanvas.class'
import { GameConfig } from '../game/GameConfig.class'
import { GameCamera } from './GameCamera.class'
import type { DrawImage } from '../types/DrawImage.type'
import type { RectCoordinates } from '../types/RectCoordinates.type'

interface MapRendererConstructor {
    config: GameConfig
    canvas: GameCanvas
    camera: GameCamera
}

class MapRenderer {
    readonly #config: GameConfig
    readonly #canvas: GameCanvas
    readonly #camera: GameCamera

    constructor(data: MapRendererConstructor) {
        this.#config = data.config
        this.#canvas = data.canvas
        this.#camera = data.camera
    }

    saveContext = (): void => {
        if (!this.#canvas.context) return
        this.#canvas.context.save()
    }

    restoreContext = (): void => {
        if (!this.#canvas.context) return
        this.#canvas.context.restore()
    }

    setScale = (scale: number): void => {
        if (!this.#canvas.context) return
        this.#canvas.context.scale(scale, scale)
    }

    clearCanvas = (): void => {
        if (!this.#canvas.context) return
        this.#canvas.context.fillStyle = '#6c757d'
        this.#canvas.context.fillRect(0, 0, this.#canvas.element.width, this.#canvas.element.height)
    }

    globalTranslate = (): void => {
        if (!this.#canvas.context) return
        /*
        this.#canvas.element.style.transformOrigin = "0 0";
        this.#canvas.element.style.transform = `scale(${this.#config.scale})`
        */
        this.#canvas.context.translate(this.#canvas.center.xPix, this.#canvas.center.yPix)
        this.setScale(this.#config.getScale())

        this.#canvas.context.translate(-this.#camera.getMapOffset().xPix, -this.#camera.getMapOffset().yPix)
    }

    getCurrentViewport = (): RectCoordinates => {
        const mapOffset = this.#camera.getMapOffset()
        const xPix0 = mapOffset.xPix - this.#canvas.center.xPix / this.#config.getScale()
        const yPix0 = mapOffset.yPix - this.#canvas.center.yPix / this.#config.getScale()
        const xPix1 = mapOffset.xPix + this.#canvas.center.xPix / this.#config.getScale()
        const yPix1 = mapOffset.yPix + this.#canvas.center.yPix / this.#config.getScale()
        return {
            xPix0,
            yPix0,
            xPix1,
            yPix1,
        }
    }

    drawDebugGrid = (data: { dx: number; dy: number; dw: number; dh: number }): void => {
        if (!this.#canvas.context) return
        this.#canvas.context.beginPath()
        this.#canvas.context.strokeStyle = '#f00' // some color/style
        this.#canvas.context.lineWidth = 1
        this.#canvas.context.strokeRect(data.dx, data.dy, data.dw, data.dh)
    }

    drawImage = (data: DrawImage, isDebug = false): void => {
        if (!this.#canvas.context) return
        this.#canvas.context.drawImage(data.img, data.sx, data.sy, data.sw, data.sh, data.dx, data.dy, data.dw, data.dh)
        if (isDebug) this.drawDebugGrid(data)
    }
}

const createMapRenderer = (config: GameConfig, canvas: GameCanvas, camera: GameCamera): MapRenderer => {
    if (!(config instanceof GameConfig)) throw new Error('createMapRenderer:: config must be an instance of GameConfig')
    if (!(canvas instanceof GameCanvas)) throw new Error('createMapRenderer:: canvas must be an instance of GameCanvas')
    if (!(camera instanceof GameCamera)) throw new Error('createMapRenderer:: camera must be an instance of Camera')
    return new MapRenderer({ config, canvas, camera })
}

export { createMapRenderer, MapRenderer }
