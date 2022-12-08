import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Bicycle from '../Bicycle/Bicycle';

const Bicycles = (props) => {
    const [cycles, setCycles] = useState([]);
    const [loader, setLoader] = useState(false);
    const page = props.pageFrom;
    let limitShowCycle = 0;
    if (page === 'home') {
        limitShowCycle = 6;
    }
    useEffect(() => {
        setLoader(true);
        let url = `https://hero-cycle-server-side-production.up.railway.app/cycles?limit=${limitShowCycle}`;
        axios.get(url)
            .then(result => {
                if (result.data) {
                    setCycles(result.data)
                    setLoader(false)
                }
            })
            .catch(e => { })
            .finally(() => { setLoader(false) });
    }, [limitShowCycle])
    return (
        <>
            <div className="container p-3">
                <h1 className="pb-2 border-bottom text-center text-center">Explore <span className="text-primary fw-bold">Hero Cycles</span> </h1>
                <div className="row row-cols-1 row-cols-md-3 g-2 [y-5">
                    {
                        !loader &&
                        cycles.map(cycle => <Bicycle key={cycle._id} cycle={cycle}></Bicycle>)

                    }
                </div>
            </div>
        </>
    );
};

export default Bicycles;