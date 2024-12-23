import { memo, useState, useEffect, useRef } from 'react'
import classNames from './Game.module.scss'
import WildWestGame from "../../game/wildWest/WildWestGame.class"
import WildWestCommand from "../../game/wildWest/WildWestCommand.class"
import { Modal } from '../../components/Modal.component'

import type { ModalHandler } from '../../components/Modal.component'

const npcMapping: {[index: string]:string} = {
    worker: 'business_experience',
    bartender: 'technical_skills',
    sheriff: 'education'
}

const defaultConfig = {
    scale: 4,
    moveSpeed: 2,
    fps: 120,
}

const Game: React.FC = memo(() => {
    const command: React.RefObject<WildWestCommand | null> = useRef(null)
    const gameContainer = useRef(null)
    const modalRef: React.RefObject<ModalHandler | null> = useRef(null)

    const [moveSpeed, setMoveSpeed] = useState(defaultConfig.moveSpeed)
    const [scale, setScale] = useState(defaultConfig.scale)
    const [fps, setFPS] = useState(defaultConfig.fps)

    const onChangeMoveSpeed = (e:React.ChangeEvent<HTMLInputElement>) => {
        const speed = parseInt(e.target.value)
        setMoveSpeed(speed)
        command.current?.game.player.movable.setMoveSpeed(speed)
    }

    const onChangeScale = (e:React.ChangeEvent<HTMLInputElement>) => {
        const scale = parseInt(e.target.value)
        setScale(scale)
        command.current?.game.config.setScale(scale)
    }
    
    const onChangeFPS = (e:React.ChangeEvent<HTMLInputElement>) => {
        const fps = parseInt(e.target.value)
        setFPS(fps)
        command.current?.game.config.setFPS(fps)
    }

    useEffect(() => {

        const gameInit =  async () => {
            const game = new WildWestGame()
            await game.initialize({
                container: gameContainer.current,
                interactHandler: (name: string) => {
                    modalRef.current?.openModal(npcMapping[name])
                }
            })
            command.current = new WildWestCommand(game)
            command.current.initialize()
            command.current.start()
            command.current.game.player.movable.setMoveSpeed(defaultConfig.moveSpeed)
            command.current.game.config.setScale(defaultConfig.scale)
            command.current.game.config.setFPS(defaultConfig.fps)
            // window.gameCommand = command.current
        }
        gameInit()

        return () => { 
            command.current?.stop()
        }
    }, [])

    return (
        <>
            <Modal ref={modalRef} />
            <div className={classNames['game-container'] + ' w-100'} ref={gameContainer} />
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#gamebar" aria-controls="gamebar" aria-expanded="false" aria-label="Toggle Game Bar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <div className="input-group p-2">
                                    <label className="input-group-text" htmlFor="scale">Scale</label>
                                    <input type="number" className="form-control" min="1" max="6" value={scale} onChange={onChangeScale} />
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="input-group p-2">
                                    <label className="input-group-text" htmlFor="speed">Speed</label>
                                    <input type="number" className="form-control" min="1" max="6" value={moveSpeed} onChange={onChangeMoveSpeed} />
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="input-group p-2">
                                    <label className="input-group-text" htmlFor="speed">FPS</label>
                                    <input type="number" disabled className="form-control" value={fps} onChange={onChangeFPS} />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
})

Game.displayName = 'Game'

export default Game
