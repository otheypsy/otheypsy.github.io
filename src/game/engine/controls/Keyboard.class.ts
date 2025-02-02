class Keyboard {
    readonly #keys: Record<string, { pressed: boolean }>

    constructor(keys: string[]) {
        this.#keys = {}
        this.#initKeys(keys)
        this.#registerKeyDownEvents()
        this.#registerKeyUpEvents()
    }

    readonly #initKeys = (keys: string[]): void => {
        for (const key of keys) {
            this.#keys[key] = {
                pressed: false,
            }
        }
    }

    readonly #registerKeyDownEvents = (): void => {
        window.addEventListener('keydown', (e) => {
            if (Object.prototype.hasOwnProperty.call(this.#keys, e.key)) this.#keys[e.key].pressed = true
        })
    }

    readonly #registerKeyUpEvents = (): void => {
        window.addEventListener('keyup', (e) => {
            if (Object.prototype.hasOwnProperty.call(this.#keys, e.key)) this.#keys[e.key].pressed = false
        })
    }

    getKeys = (): Record<string, { pressed: boolean }> => {
        return this.#keys
    }
}

const createKeyboard = (keys: string[]): Keyboard => {
    if (!Array.isArray(keys)) throw new Error('createKeyboard:: keys must be an array')
    if (keys.length === 0) throw new Error('createKeyboard:: keys must not be empty')
    return new Keyboard(keys)
}

export { createKeyboard, Keyboard }
