import personalData from '../../../public/data/personal.data.json'

const mockFetch = (url: string) => {
    switch (url) {
        case '/data/personal.data.json': {
            return {
                ok: true,
                status: 200,
                json: () => Promise.resolve(personalData),
            }
        }
        default: {
            throw new Error(`Unhandled request: ${url}`)
        }
    }
}

export { mockFetch }
