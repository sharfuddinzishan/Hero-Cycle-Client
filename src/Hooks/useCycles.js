import axios from 'axios';
import { useState, useEffect } from 'react';

export const useCycles = () => {
    const [cycles, setCycles] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        setLoader(true);
        let url = "http://localhost:4000/cycles";
        axios.get(url)
            .then(result => {
                if (result.data) {
                    setCycles(result.data)
                    setLoader(false)
                }
            })
            .catch(e => { })
            .finally(() => { setLoader(false) });
    }, [])
    return [cycles, setCycles, loader]
}
