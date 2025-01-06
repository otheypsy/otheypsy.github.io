class GameOffscreenCanvas {
    element: OffscreenCanvas
    context: OffscreenCanvasRenderingContext2D

    constructor(width: number, height: number) {
        this.element = new OffscreenCanvas(width, height)
        const context = this.element.getContext('2d', { alpha: true })
        if (!context) throw new Error('GameOffscreenCanvas:: failed to get 2D context')
        this.context = context
    }
}

const createGameOffscreenCanvas = (width: number, height: number): GameOffscreenCanvas => {
    if (!Number.isInteger(width)) throw new Error('createGameOffscreenCanvas:: width must be an integer')
    if (width < 1) throw new Error('createGameOffscreenCanvas:: width must be postive')
    if (!Number.isInteger(height)) throw new Error('createGameOffscreenCanvas:: height must be an integer')
    if (height < 1) throw new Error('createGameOffscreenCanvas:: height must be postive')
    return new GameOffscreenCanvas(width, height)
}

export { createGameOffscreenCanvas, GameOffscreenCanvas }
