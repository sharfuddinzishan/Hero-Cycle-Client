import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyOrder = (props) => {
    const getOrder = props.order || {}
    const setOrderID = props.setOrderID
    const setSingleOrderDetails = props.setSingleOrderDetails
    const [getSingleCycleInfo, setSingleCycleInfo] = useState({});
    let [loadingSingleCycle, setLoadingSingleCycle] = useState(true);

    useEffect(() => {
        setLoadingSingleCycle(true)
        axios.get(`https://hero-cycle-server-side-production.up.railway.app/cycles/${getOrder.cycleID}`)
            .then(result => {
                console.log(result)
                if (result?.data?.model) {
                    setSingleCycleInfo(result.data);
                    setLoadingSingleCycle(false)
                }
            })
            .catch(() => {
                setLoadingSingleCycle(false)
            })
    }, [getOrder.cycleID])

    return (
        <>
            {
                !loadingSingleCycle && <>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-sm-8">
                                <button
                                    type="button"
                                    id="adminDetailsBtn"
                                    className="btn btn-sm btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#detailsModal"
                                    onClick={() => { setOrderID(getOrder._id); setSingleOrderDetails(getOrder) }}
                                >
                                    {getOrder?.model}
                                </button>
                                <h5 className="card-title text-muted">{getOrder?.model}</h5>
                                <h5 className="">Price: <span className="fw-bold text-info">{getOrder?.price}</span></h5>
                            </div>
                            <div className="col-12 col-sm-4">
                                <img src={getSingleCycleInfo?.picture}
                                    className="card-img-top img-fluid ms-auto" alt="..."
                                    style={{ width: '70px', height: '70px' }}
                                />
                            </div>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Order By: {getOrder?.orderBy}</li>
                        <li className="list-group-item">Order Status: <span className="bg-primary w-25 h-25 rounded-pill py-1 px-2 text-center text-light">{getOrder?.orderStatus}</span></li>
                    </ul>
                    {/* <div className="card-body">
                    </div> */}
                </>}
        </>
    );
};

export default MyOrder;