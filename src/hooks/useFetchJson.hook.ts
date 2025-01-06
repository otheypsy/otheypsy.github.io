import { useState, useEffect } from 'react'
import { loadJSON } from '../utils/core.utils'

const useFetchJson = (url: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<object | null>(null)

    useEffect(() => {
        const getJSON = async () => {
            const response = await loadJSON(url)
            setData(response)
            setIsLoading(false)
        }
        setIsLoading(true)
        getJSON().then().catch(console.error)
    }, [url])

    return { data, isLoading }
}

export { useFetchJson }
