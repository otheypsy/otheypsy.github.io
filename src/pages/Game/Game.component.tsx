import { memo, useState, useEffect, useRef } from 'react'
import classNames from './Game.module.scss'
import WildWestGame from "../../game/wildWest/WildWestGame.class"
import WildWestCommand from "../../game/wildWest/WildWestCommand.class"
import Modal from '../../components/Modal.component'
import { Modal as BootstrapModal } from 'bootstrap'

const npcMapping = {
    worker: 'business_experience',
    bartender: 'technical_skills',
    sheriff: 'education'
}

const Game: React.FC = memo(() => {
    const gameCommand: React.MutableRefObject<WildWestCommand | undefined> = useRef()
    const gameContainer = useRef(null)
    const modalRef = useRef(null)

    const [moveSpeed, setMoveSpeed] = useState(2)
    const [scale, setScale] = useState(4)
    const [fps, setFPS] = useState(120)

    const onChangeMoveSpeed = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMoveSpeed(parseInt(e.target.value))
    }

    const onChangeScale = (e:React.ChangeEvent<HTMLInputElement>) => {
        setScale(parseInt(e.target.value))
    }
    
    const onChangeFPS = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFPS(parseInt(e.target.value))
    }

    useEffect(() => {

        const gameInit =  async () => {
            const game = new WildWestGame()
            await game.initialize({
                container: gameContainer.current,
                interactHandler: (name: string) => {
                    modalRef.current.openModal(npcMapping[name])
                }
            })
            gameCommand.current = new WildWestCommand(game)
            gameCommand.current.initialize()
            gameCommand.current.start()
            gameCommand.current.game.player.movable.setMoveSpeed(moveSpeed)
            gameCommand.current.game.config.setScale(scale)
            gameCommand.current.game.config.setFPS(fps)
            // window.gameCommand = gameCommand.current
        }
        gameInit()

        return () => { 
            gameCommand.current?.stop()
        }
    }, [])

    return (
        <>
            <Modal ref={modalRef} />
            <div className={classNames.gameContainer + ' w-100'} ref={gameContainer} />
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

export default Game
