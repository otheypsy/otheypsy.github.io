import { DrawImageSource } from '../types/DrawImageSource.type'

class TileSet {
    constructor() {
        if (new.target === TileSet) {
            throw new Error('TileSet:: TileSet an abstract class.')
        }
    }

    getSource = (gid: number): DrawImageSource => {
        console.log('TileSet::getSource:: ', gid)
        return { img: new Image(), sx: 0, sy: 0, sw: 0, sh: 0 }
    }
}

export { TileSet }
