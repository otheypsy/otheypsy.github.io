import {
    createGameConfig,
    createGameCanvas,
    createCamera,
    createControls,
    createKeyboard,
    createTouchscreen,
    createMapRenderer,
    createBaseRenderer,
    createLevelCollisionDetector,
    createSpeechBubble,
} from '@engine'

import type {
    GameConfig,
    GameCanvas,
    GameCamera,
    Controls,
    MapRenderer,
    AnimatedSpriteActor,
    BaseRenderer,
    Level,
    LevelCollisionDetector,
} from '@engine'

import AnimatedSpriteActorFactory from '../factories/AnimatedSpriteActor.factory'
import LevelFactory from '../factories/Level.factory'
import NPC from '../NPC.class'
import { loadJSON } from '../../utils/core.utils'

interface ActorConfigJSON {
    tilesets: object[]
    tilewidth: number
    tileheight: number
    sprites: Record<string, number[]>
    start: {
        x: number
        y: number
    }
    dialogue?: string
}

interface LevelConfigJSON {
    xMax: number
    yMax: number
    width: number
    height: number
    tilewidth: number
    tileheight: number
    tilesets: object[]
    layers: object[]
}

class WildWestGame {
    config!: GameConfig
    canvas!: GameCanvas
    camera!: GameCamera
    level!: Level
    controls!: Controls
    baseRenderer!: BaseRenderer
    mapRenderer!: MapRenderer
    collisionDetector!: LevelCollisionDetector
    player!: AnimatedSpriteActor
    npcs!: NPC[]

    readonly #createCore = (container: HTMLElement): void => {
        container.innerHTML = ''
        this.config = createGameConfig()
        this.canvas = createGameCanvas(container)
        this.camera = createCamera()
    }

    readonly #createRenderers = (): void => {
        this.mapRenderer = createMapRenderer(this.config, this.canvas, this.camera)
        this.baseRenderer = createBaseRenderer(this.canvas)
    }

    readonly #createControls = (): void => {
        const keyboard = createKeyboard(['w', 'a', 's', 'd', 'e'])
        const touchscreen = createTouchscreen(this.canvas.element)
        this.controls = createControls(keyboard, touchscreen)
    }

    readonly #creatLevel = async (): Promise<void> => {
        const levelTileMap = (await loadJSON('/assets/wildWest/tilemaps/main/main.tilemap.json')) as LevelConfigJSON
        this.level = await LevelFactory.create({
            gameName: 'wildWest',
            xMax: levelTileMap.width,
            yMax: levelTileMap.height,
            tileWidth: levelTileMap.tilewidth,
            tileHeight: levelTileMap.tileheight,
            tilesets: levelTileMap.tilesets,
            layers: levelTileMap.layers,
        })
        this.collisionDetector = createLevelCollisionDetector()
    }

    readonly #createPlayer = async (): Promise<void> => {
        const playerConfig = (await loadJSON('/assets/wildWest/actors/player.config.json')) as ActorConfigJSON
        this.player = await AnimatedSpriteActorFactory.create({
            gameName: 'wildWest',
            tilesets: playerConfig.tilesets,
            xPix: playerConfig.tilewidth,
            yPix: playerConfig.tileheight,
            sprites: playerConfig.sprites,
        })
        const playerStartPos = this.level.helper.tileToPix(playerConfig.start.x, playerConfig.start.y)
        this.player.movable.setMapPixPos(playerStartPos.xPix, playerStartPos.yPix)
        this.camera.setMapOffset(this.player.movable.getMapPixPos())
    }

    readonly #createNPCs = async (
        interactHandler = (name: string) => {
            console.log('WildWestGame::#createNPCs::interactHandler', name)
        },
    ): Promise<void> => {
        this.npcs = []
        const speechBubble = createSpeechBubble(this.config)
        const requiredNPCs = ['traveller', 'worker', 'bartender', 'sheriff']

        for (const npc of requiredNPCs) {
            const config = (await loadJSON('/assets/wildWest/actors/' + npc + '.config.json')) as ActorConfigJSON
            const actor = await AnimatedSpriteActorFactory.create({
                gameName: 'wildWest',
                tilesets: config.tilesets,
                xPix: config.tilewidth,
                yPix: config.tileheight,
                sprites: config.sprites,
            })
            const startPixPos = this.level.helper.tileToPix(config.start.x, config.start.y)
            actor.movable.setMapPixPos(startPixPos.xPix, startPixPos.yPix)
            const instance = new NPC(npc, actor, speechBubble, config.dialogue)
            instance.setInteractHandler(interactHandler)
            this.npcs.push(instance)
        }
    }

    readonly #registerSettingsForm = (): void => {
        document.getElementById('scale')?.addEventListener('change', (e: Event): void => {
            const scale = parseInt((e.target as HTMLInputElement).value)
            this.config.setScale(scale)
        })
        document.getElementById('speed')?.addEventListener('change', (e: Event): void => {
            const speed = parseInt((e.target as HTMLInputElement).value)
            this.player.movable.setMoveSpeed(speed)
        })
    }

    initialize = async (options: {
        container: HTMLElement
        interactHandler: (name: string) => void
    }): Promise<void> => {
        this.#createCore(options.container)
        this.#createRenderers()
        this.#createControls()
        await this.#creatLevel()
        await this.#createPlayer()
        await this.#createNPCs(options.interactHandler)
        this.#registerSettingsForm()
    }
}

const createWildWestGame = async (
    container?: HTMLElement,
    interactHandler?: (name: string) => void,
): Promise<WildWestGame> => {
    if (!container) throw new Error('createWildWestGame::container is null')
    if (!interactHandler) throw new Error('createWildWestGame::interactHandler is null')

    const game = new WildWestGame()
    await game.initialize({
        container,
        interactHandler,
    })
    return game
}

export { WildWestGame, createWildWestGame }
