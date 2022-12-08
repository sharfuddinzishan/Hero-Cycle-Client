import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllOrder = (props) => {
    const getOrder = props.order || {}
    // set Order to parent state to trigger which button and which modal need to call 
    const setOrderID = props.setOrderID
    const setSingleOrderDetails = props.setSingleOrderDetails
    const [getSingleCycleInfo, setSingleCycleInfo] = useState({});
    let [loadingSingleCycle, setLoadingSingleCycle] = useState(true);

    useEffect(() => {
        setLoadingSingleCycle(true)
        axios.get(`https://hero-cycle-server-side-production.up.railway.app/cycles/${getOrder.cycleID}`)
            .then(result => {
                if (result?.data?.model) {
                    setSingleCycleInfo(result.data);
                    setLoadingSingleCycle(false);
                    console.log(getSingleCycleInfo);
                }
            })
            .catch(() => {
                setLoadingSingleCycle(false)
            })
    }, [getOrder.cycleID,getSingleCycleInfo])

    return (
        <>
            {
                !loadingSingleCycle && <>
                    <td>
                        <button
                            type="button"
                            id="adminOrderDetailsBtn"
                            className="btn btn-sm btn-outline-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#detailsModal"
                            onClick={() => { setOrderID(getOrder._id); setSingleOrderDetails(getOrder) }}
                        >
                            {getOrder?.model}
                        </button>
                    </td>
                    <td>{getOrder.price}</td>
                    <td>{getOrder.email}</td>
                    <td>{getOrder.orderBy}</td>
                    <td>{getOrder.orderStatus}</td>
                </>}
        </>
    );
};

export default AllOrder;