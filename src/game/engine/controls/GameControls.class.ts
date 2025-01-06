import type { Keyboard } from './Keyboard.class'
import type { Touchscreen } from './Touchscreen.class'

type InputType = 'keyboard' | 'touchscreen'

interface InputObserver {
    type: InputType
    inputs: string[]
    callback: (key: string, type: InputType) => void
}

interface GameControlsConstructor {
    keyboard?: Keyboard
    touchscreen?: Touchscreen
}

class GameControls {
    readonly #keyboard!: Keyboard | undefined
    readonly #touchscreen!: Touchscreen | undefined
    readonly #observers: InputObserver[]

    constructor(options: GameControlsConstructor) {
        this.#observers = []
        this.#keyboard = options.keyboard
        this.#touchscreen = options.touchscreen
    }

    readonly #checkKeyboard = (observer: InputObserver): void => {
        for (const input of observer.inputs) {
            if (this.#keyboard?.getKeys()[input]?.pressed === true) {
                observer.callback(input, 'keyboard')
            }
        }
    }

    readonly #checkTouchscreen = (observer: InputObserver): void => {
        for (const input of observer.inputs) {
            if (this.#touchscreen?.getTouches()[input]?.active === true) {
                observer.callback(input, 'touchscreen')
            }
        }
    }

    addObserver = (observer: InputObserver): void => {
        switch (observer.type) {
            case 'keyboard': {
                if (!this.#keyboard) throw new Error('GameControls::addObserver:: keyboard is not defined')
                break
            }
            case 'touchscreen': {
                if (!this.#touchscreen) throw new Error('GameControls::addObserver:: touchscreen is not defined')
                break
            }
        }
        this.#observers.push(observer)
    }

    step = (): void => {
        for (const observer of this.#observers) {
            switch (observer.type) {
                case 'keyboard': {
                    this.#checkKeyboard(observer)
                    break
                }
                case 'touchscreen': {
                    this.#checkTouchscreen(observer)
                    break
                }
            }
        }
    }
}

const createControls = (keyboard?: Keyboard, touchscreen?: Touchscreen): GameControls => {
    return new GameControls({ keyboard, touchscreen })
}

export { createControls, GameControls as Controls }
