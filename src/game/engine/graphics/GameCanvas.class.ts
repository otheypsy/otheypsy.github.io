import type { PixelPosition } from '../types/PixelPosition'

const style = {
    border: '2px solid gray',
    display: 'block',
    pad: 10,
}

class GameCanvas {
    readonly element: HTMLCanvasElement
    readonly context: CanvasRenderingContext2D | null
    readonly center: PixelPosition

    constructor(container: HTMLElement) {
        const element = document.createElement('canvas')
        this.#initStyle(element, container)
        this.context = this.#initCanvas(element, container)
        this.element = element
        this.center = {
            xPix: this.element.width / 2,
            yPix: this.element.height / 2,
        }
    }

    readonly #initStyle = (element: HTMLCanvasElement, container: HTMLElement): void => {
        element.width = container.clientWidth // - style.pad - ((container.clientWidth - style.pad) % (2 * scale))
        element.height = container.clientHeight // - (container.clientHeight % (2 * scale))
        element.style.border = style.border
        element.style.display = style.display
        element.style.margin = (style.pad / 2).toString() + 'px auto'
        element.style.imageRendering = 'pixelated'
    }

    readonly #initCanvas = (canvas: HTMLCanvasElement, container: HTMLElement): CanvasRenderingContext2D | null => {
        container.append(canvas)
        const context = canvas.getContext('2d', { alpha: false })
        if (!(context instanceof CanvasRenderingContext2D))
            throw new Error('GameCanvas::#initCanvas:: CanvasRenderingContext2D not supported')
        context.imageSmoothingEnabled = false
        return context
    }
}

const createGameCanvas = (container: HTMLElement): GameCanvas => {
    if (!(container instanceof HTMLElement))
        throw new Error('createGameCanvas:: container must be an instance of HTMLDivElement')
    return new GameCanvas(container)
}

export { createGameCanvas, GameCanvas }
