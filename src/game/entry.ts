import '../style.css'
import WildWestGame from './wildWest/WildWestGame.class'
import WildWestCommand from './wildWest/WildWestCommand.class'

const createWildWestGame = async (): Promise<WildWestCommand> => {
    const game = new WildWestGame()
    await game.initialize()
    return new WildWestCommand(game)
}

const run = async (): Promise<void> => {
    const command = await createWildWestGame()
    command.initialize()
    command.start()
    command.step()
}

window.onload = () => {
    void run()
}
