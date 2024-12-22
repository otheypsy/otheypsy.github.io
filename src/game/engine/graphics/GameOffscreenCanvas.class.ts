class GameOffscreenCanvas {
    element: OffscreenCanvas
    context: OffscreenCanvasRenderingContext2D

    constructor(width: number, height: number) {
        this.element = new OffscreenCanvas(width, height)
        this.context = this.element.getContext('2d', { alpha: true }) as OffscreenCanvasRenderingContext2D
    }
}

export default GameOffscreenCanvas
