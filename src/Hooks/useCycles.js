import axios from 'axios';
import { useState, useEffect } from 'react';

export const useCycles = () => {
    const [cycles, setCycles] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        setLoader(true);
        let url = "https://hero-cycle-server-side-production.up.railway.app/cycles";
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
