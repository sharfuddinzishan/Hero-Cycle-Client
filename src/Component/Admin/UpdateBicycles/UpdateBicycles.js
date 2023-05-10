import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './UpdateBicycles.css'

const UpdateBicycles = (props) => {
    const { getCycleID, setRefreshed } = props || {}
    const [getSingleCycleInfo, setSingleCycleInfo] = useState({});
    let [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        setLoading(true)
        setSuccess(false)
        setError(false)
        axios.get(`https://hero-cycle-server-side-production.up.railway.app/cycles/${getCycleID}`)
            .then(result => {
                if (result?.data?.model) {
                    setSingleCycleInfo(result.data);
                    setLoading(false)
                }
            })
            .catch(() => {
                setLoading(false)
            })
    }, [getCycleID])

    const token = localStorage.getItem('tokenID')
    let headers = {
        "authorization": 'Bearer ' + token
    };
    const handleInput = e => {
        const copyCycle = { ...getSingleCycleInfo };
        copyCycle[e.target.name] = e.target.value;
        setSingleCycleInfo(copyCycle);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        setSuccess(false)
        setError(false)
        setRefreshed(false)
        axios.put('https://hero-cycle-server-side-production.up.railway.app/cycle', getSingleCycleInfo, { headers })
            .then(result => {
                if (result.data.status === 401) { setError(true) }
                else {
                    setSuccess(true)
                    setRefreshed(true)
                }
            })
            .catch(e => setError(true))
            .finally(() => setLoading(false))
    };

    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-xl modal-fullscreen-sm-down modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            {
                                !loading && <h5 className="modal-title" id="staticBackdropLabel"> {getSingleCycleInfo?.model}</h5>
                            }
                            <button onClick={() => { setError(false); setSuccess(false) }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                success && <div className="alert alert-sm alert-success alert-dismissible fade show" role="alert">
                                    <strong>Updated!</strong> Cycle.
                                    <button type="button" onClick={() => setSuccess(false)} className="btn-close"
                                        data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            }
                            {
                                error && <div className="alert alert-sm alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Failed!</strong> To Update Cycle.
                                    <button type="button" onClick={() => setError(false)} className="btn-close" data-bs-dismiss="alert"
                                        aria-label="Close"></button>
                                </div>
                            }
                            {
                                !loading && <form id="updateCycleForm" onSubmit={handleSubmit} autoComplete="off">
                                    <div className="d-flex gap-3 flex-column flex-sm-row">
                                        <div className="mb-0 mb-md-1">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="_id"
                                                defaultValue={getSingleCycleInfo?._id}
                                                hidden
                                                disabled
                                            />
                                        </div>
                                        <div className="mb-0 mb-md-1">
                                            <label htmlFor="model" className="form-label fs-6 fw-bold">Model</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                id="model"
                                                name="model"
                                                placeholder="Provide Model"
                                                required
                                                onBlur={handleInput}
                                                defaultValue={getSingleCycleInfo?.model}
                                            />
                                        </div>
                                        <div className="mb-0 mb-md-1">
                                            <label htmlFor="price" className="form-label fs-6 fw-bold">Price</label>
                                            <input
                                                type="number"
                                                className="form-control form-control-sm"
                                                id="price"
                                                name="price"
                                                placeholder="Price"
                                                required
                                                onBlur={handleInput}
                                                defaultValue={getSingleCycleInfo?.price}
                                            />
                                        </div>
                                        <div className="mb-0 mb-md-1">
                                            <label htmlFor="frameSize" className="form-label fs-6 fw-bold">Frame Size(cm)</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                id="frameSize"
                                                name="frameSize"
                                                placeholder="Frame Size"
                                                onBlur={handleInput}
                                                defaultValue={getSingleCycleInfo?.frameSize}
                                            />
                                        </div>
                                        <div className="mb-0 mb-md-1">
                                            <label htmlFor="weight" className="form-label fs-6 fw-bold">Weight(gm)</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                id="weight"
                                                name="weight"
                                                placeholder="Weight"
                                                onBlur={handleInput}
                                                defaultValue={getSingleCycleInfo?.weight}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex gap-3 flex-column flex-sm-row">
                                        <div className="mb-0 mb-md-1">
                                            <label htmlFor="material" className="form-label fs-6 fw-bold">Material</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                id="material"
                                                name="material"
                                                placeholder="Material"
                                                onBlur={handleInput}
                                                defaultValue={getSingleCycleInfo?.material}
                                            />
                                        </div>
                                        <div className="mb-0 mb-md-1">
                                            <label htmlFor="preferAge" className="form-label fs-6 fw-bold">Preferred Age</label>
                                            <input
                                                type="number"
                                                className="form-control form-control-sm"
                                                id="preferAge"
                                                name="preferAge"
                                                placeholder="Preferred Age"
                                                onBlur={handleInput}
                                                defaultValue={getSingleCycleInfo?.preferAge}
                                            />
                                        </div>
                                        <div className="mb-0 mb-md-1">
                                            <label htmlFor="gender" className="form-label fs-6 fw-bold">Gender</label>
                                            <select
                                                id="gender"
                                                className="form-select form-select-sm"
                                                name="gender"
                                                onChange={handleInput}
                                                defaultValue={getSingleCycleInfo?.gender}
                                            >
                                                <option value="Boys">Boys</option>
                                                <option value="Women">Women</option>
                                            </select>
                                        </div>
                                        <div className="mb-0 mb-md-1">
                                            <label htmlFor="category" className="form-label fs-6 fw-bold">Category</label>
                                            <select
                                                id="category"
                                                className="form-select form-select-sm"
                                                name="category"
                                                onChange={handleInput}
                                                defaultValue={getSingleCycleInfo?.category}
                                            >
                                                <option value="All">All</option>
                                                <option value="Kids">Kids</option>
                                                <option value="City">City</option>
                                                <option value="Doraimon">Doraimon</option>
                                            </select>
                                        </div>
                                        <div className="mb-0 mb-md-1">
                                            <label htmlFor="status" className="form-label fs-6 fw-bold">Status</label>
                                            <select
                                                id="status"
                                                className="form-select form-select-sm"
                                                name="status"
                                                onChange={handleInput}
                                                defaultValue={getSingleCycleInfo?.status || 'active'}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-0 mb-md-1">
                                        <label htmlFor="picture" className="form-label fs-6 fw-bold">Picture URL</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="picture"
                                            name="picture"
                                            placeholder="URL of Image"
                                            required
                                            onBlur={handleInput}
                                            defaultValue={getSingleCycleInfo?.picture}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="overview" className="form-label fw-bold">Summary</label>
                                        <textarea
                                            className="form-control"
                                            id="overview"
                                            name="overview"
                                            rows="2"
                                            placeholder="Provide Short Summary"
                                            required
                                            onBlur={handleInput}
                                            defaultValue={getSingleCycleInfo?.overview}
                                        />
                                    </div>
                                    <button className="d-block ms-auto btn btn-primary fw-bold">Update Cycle</button>
                                </form>
                            }
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => { setError(false); setSuccess(false) }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateBicycles;