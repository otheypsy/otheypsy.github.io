import personalData from '../../../public/data/personal.data.json'

const mockFetch = (url: RequestInfo | URL, init?: RequestInit) => {
    switch (url) {
        case '/data/personal.data.json': {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(personalData),
            } as Response)
        }
        default: {
            throw new Error('mockFetch::Unhandled request url - ' + (url as string))
        }
    }
}

export { mockFetch }
