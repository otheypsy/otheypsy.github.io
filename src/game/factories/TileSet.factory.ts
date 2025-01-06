import { createBasicTileSet } from '@engine'
import type { BasicTileSet } from '@engine'
import { loadImage, loadJSON } from '../../utils/core.utils'

interface CreateTileSet {
    gameName: string
    folderName: string
    fileName: string
    startId: number
}

interface TileSetConfigJSON {
    columns: number
    tilecount: number
    startId: number
    tilewidth: number
    tileheight: number
}

const create = async (tileSet: CreateTileSet): Promise<BasicTileSet> => {
    const relativeImgPath =
        '/assets/' + tileSet.gameName + '/tilesets/' + tileSet.folderName + '/' + tileSet.fileName + '.tileset.png'
    const imgUrl = new URL(relativeImgPath, import.meta.url).href
    const image = await loadImage(imgUrl)
    const config = (await loadJSON(
        '/assets/' + tileSet.gameName + '/tilesets/' + tileSet.folderName + '/' + tileSet.fileName + '.tileset.json',
    )) as TileSetConfigJSON

    const gridConfig = {
        xMax: config.columns,
        count: config.tilecount,
        startId: tileSet.startId,
    }

    const modelConfig = {
        xPix: config.tilewidth,
        yPix: config.tileheight,
    }

    return createBasicTileSet(image, gridConfig, modelConfig)
}
export default { create }
