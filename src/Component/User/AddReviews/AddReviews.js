import axios from 'axios';
import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const AddReviews = () => {
    const { user, loading } = useAuth();
    const [review, setReview] = useState({
        email: `${user.email}`,
        userName: `${user?.displayName || 'Anonymouse'}`,
        subject: 'N/A',
        comments: 'No Comments Posted By User',
        rating: 2
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleInput = e => {
        const copyCycle = { ...review };
        copyCycle[e.target.name] = e.target.value;
        setReview(copyCycle);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const getReview = { ...review }
        console.log(getReview)
        const token = localStorage.getItem('tokenID')
        let headers = {
            "authorization": 'Bearer ' + token
        };
        setSuccess(false)
        setError(false)
        axios.post('https://hero-cycle-server-side-production.up.railway.app/reviews', getReview, { headers })
            .then(result => {
                console.log('Revies ', result)
                if (!result.data.insertedId) { setError(true) }
                else { setSuccess(true) }
            })
            .catch(e => setError(true))
            .finally(() => e.target.reset())
    };
    return (
        <>
            <div className="container p-2">
                <h1 className="text-center fw-bold text-info mb-2">Add Review</h1>
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
                {
                    !loading && <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="row">
                            <div className="col-12 col-md-7">
                                <div className="mb-0 mb-md-1">
                                    <label htmlFor="userName" className="form-label fs-6 fw-bold">Your Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        id="userName"
                                        name="userName"
                                        placeholder="Type Your Full Name"
                                        onBlur={handleInput}
                                        defaultValue={user?.displayName}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-5">
                                <div className="mb-0 mb-md-1">
                                    <label htmlFor="subject" className="form-label fs-6 fw-bold">Rating (1 to 5)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        className="form-control form-control-sm"
                                        id="rating"
                                        name="rating"
                                        placeholder="Provide Rating Regarding Our Service"
                                        onBlur={handleInput}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-0 mb-md-1">
                            <label htmlFor="subject" className="form-label fs-6 fw-bold">Subject</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                id="subject"
                                name="subject"
                                placeholder="Subject For Your Opinion"
                                onBlur={handleInput}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="comments" className="form-label fw-bold">Your Feedback/Review</label>
                            <textarea
                                className="form-control"
                                id="comments"
                                name="comments"
                                rows="5"
                                placeholder="Provide Your Experience With Us"
                                required
                                onBlur={handleInput}
                            />
                        </div>
                        <button className="d-block btn btn-primary fw-bold">Post Review</button>
                    </form>
                }
            </div>
        </>
    );
};

export default AddReviews;