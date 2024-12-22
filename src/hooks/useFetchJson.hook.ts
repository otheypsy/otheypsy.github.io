import { useState, useEffect } from 'react';
import { loadJSON } from '../utils/core.utils';

const useFetch = (url: string) => {
    const [data, setData] = useState(null);
  
    useEffect(() => {
        const getJSON = async () => {
            const response = await loadJSON(url)
            setData(response)
        }
        getJSON()
        return () => {}
    }, [url])
  
    return data
}
  
  export default useFetch