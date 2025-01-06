const loadJSON = async (url: string): Promise<object> => {
    const response = await window.fetch(url)
    return response.json() as Promise<object>
}

const loadImage = async (url: string): Promise<HTMLImageElement> => {
    const img = new Image()
    img.src = url
    await img.decode()
    return img
}

export { loadJSON, loadImage }
