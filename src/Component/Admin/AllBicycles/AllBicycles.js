import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleCycleModalInfo from '../SingleCycleModalInfo/SingleCycleModalInfo';
import UpdateBicycles from '../UpdateBicycles/UpdateBicycles';
import './AllBicycles.css'

const AllBicycles = () => {
    const [getCycleID, setCycleID] = useState('');
    let [refreshed, setRefreshed] = useState(false)
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
    }, [refreshed])

    const handleCycleDelete = (cycleID) => {
        const prompt = window.confirm('Want To Delete Cycle?');
        if (prompt === true) {
            setRefreshed(false);
            axios.delete(`https://hero-cycle-server-side-production.up.railway.app/cycles/${cycleID}`)
                .then(result => {
                    if (result.data.deletedCount === '0') {
                        alert('Failed To Delete Cycle');
                        setRefreshed(false)
                    }
                    else setRefreshed(true);
                })
                .catch(() => setRefreshed(false))
                .finally(() => {
                    setRefreshed(false);
                })
        }
    }

    return (
        <>
            <div className="container-fluid py-3">
                <h1 className="text-center">All Cycles List</h1>
                <div className="row">
                    <div className="col-12 m-0 p-0 table-responsive">
                        <table id="all-bicycles" className="table table-striped table-hover table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"> Model</th>
                                    <th scope="col"> Price</th>
                                    <th scope="col"> Frame</th>
                                    <th scope="col"> Weight</th>
                                    <th scope="col"> Update</th>
                                    <th scope="col"> Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !loader ? <>
                                        {
                                            cycles?.map((singleCycle, index) => {
                                                const {
                                                    _id: cycleID,
                                                    model,
                                                    price,
                                                    frameSize,
                                                    weight
                                                } = singleCycle || {};

                                                return <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            id="adminDetailsBtn"
                                                            className="btn btn-sm btn-outline-primary"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#detailsModal"
                                                            onClick={() => setCycleID(cycleID)}
                                                        >
                                                            {model}
                                                        </button>
                                                    </td>
                                                    <td>{price}</td>
                                                    <td>{frameSize}</td>
                                                    <td>{weight}</td>
                                                    <td>
                                                        {/* <Link to={`/admin/update/bycycle/${cycleID}`}
                                                            className="
                                                            btn btn-sm 
                                                            btn-primary 
                                                            w-100"
                                                        >
                                                            Update
                                                        </Link> */}
                                                        <button
                                                            type="button"
                                                            id="adminCycleUpdateBtn"
                                                            className="btn btn-sm btn-primary"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#staticBackdrop"
                                                            onClick={() => setCycleID(cycleID)}
                                                        >
                                                            Update
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            id="adminCycleDeleteBtn"
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() => handleCycleDelete(cycleID)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            })}
                                    </> : <tr></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    <>
                        <UpdateBicycles setRefreshed={setRefreshed} getCycleID={getCycleID}></UpdateBicycles>
                        <SingleCycleModalInfo getCycleID={getCycleID}></SingleCycleModalInfo>
                    </>
                }
            </div>
        </>
    );
};

export default AllBicycles;