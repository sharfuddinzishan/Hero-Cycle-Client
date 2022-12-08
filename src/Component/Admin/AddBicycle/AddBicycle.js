import axios from 'axios';
import React, { useState } from 'react';

const AddBicycle = () => {
    const [singleCycle, setSingleCycle] = useState({
        model: '',
        price: '',
        frameSize: 'N/A',
        weight: 'N/A',
        material: 'N/A',
        preferAge: 'N/A',
        gender: 'N/A',
        category: 'All',
        picture: '',
        overview: ''
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // Get Token 
    const token = localStorage.getItem('tokenID')
    let headers = {
        "authorization": 'Bearer ' + token
    };
    // Take Input from Form 
    const handleInput = e => {
        const copyCycle = { ...singleCycle };
        copyCycle[e.target.name] = e.target.value;
        setSingleCycle(copyCycle);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(false)
        setError(false)
        axios.post('https://hero-cycle-server-side-production.up.railway.app/cycle', singleCycle, { headers })
            .then(result => {
                if (result.data.status === 401) { setError(true) }
                else { setSuccess(true) }
            })
            .catch(e => setError(true))
            .finally(() => e.target.reset())
    };
    return (
        <>
            <div className="container p-2">
                <h1 className="text-center fw-bold text-info mb-3">Add New Cycle</h1>
                {
                    success && <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Added!</strong> New Cycle.
                        <button type="button" onClick={() => setSuccess(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        <br />
                    </div>
                }
                {
                    error && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Failed!</strong> To Add Cycle.
                        <button type="button" onClick={() => setError(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        <br />
                    </div>
                }
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="d-flex gap-3 flex-column flex-sm-row">
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
                            />
                        </div>
                        <div className="mb-0 mb-md-1">
                            <label htmlFor="gender" className="form-label fs-6 fw-bold">Gender</label>
                            <select id="gender" className="form-select form-select-sm" name="gender" onChange={handleInput}>
                                <option value="Boys">Boys</option>
                                <option value="Women">Women</option>
                            </select>
                        </div>
                        <div className="mb-0 mb-md-1">
                            <label htmlFor="category" className="form-label fs-6 fw-bold">Category</label>
                            <select id="category" className="form-select form-select-sm" name="category" onChange={handleInput}>
                                <option value="All">All</option>
                                <option value="Kids">Kids</option>
                                <option value="City">City</option>
                                <option value="Doraimon">Doraimon</option>
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
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="overview" className="form-label fw-bold">Summary</label>
                        <textarea
                            className="form-control"
                            id="overview"
                            name="overview"
                            rows="3"
                            placeholder="Provide Short Summary"
                            required
                            onBlur={handleInput}
                        />
                    </div>
                    <button className="d-block ms-auto btn btn-primary fw-bold">Add Cycle</button>
                </form>
            </div>
        </>
    );
};

export default AddBicycle;