import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';

const Reviews = () => {
    const [loadingReview, setLoadingReview] = useState(false);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        setLoadingReview(false);
        axios.get('https://hero-cycle-server-side-production.up.railway.app/reviews')
            .then(result => {
                if (result.data) {
                    setReviews(result.data)
                    setLoadingReview(true);
                }
            })
            .catch(() => { })
    }, [])
    return (
        <div className="bg-info">
            <div className='container p-3'>
                <h1 className="pb-2 border-bottom text-center text-center">
                    Customer <span className="text-primary fw-bold">Reviews</span>
                </h1>
                {
                    !loadingReview && <> <div className="spinner-grow text-primary text-center" role="status">
                        <span className="visually-hidden">Loading Reviews</span>
                    </div>
                        <div className="spinner-grow text-primary text-center" role="status">
                            <span className="visually-hidden">Loading Reviews</span>
                        </div>
                    </>
                }
                <div className="row py-5">
                    {
                        loadingReview && reviews.map((review, index) => {
                            return < div className="col-12 col-sm-6 col-md-4">
                                <div className="card text-dark bg-light mb-3">

                                    <div className="card-header" style={{ border: '100px!important' }}>Reviwed By-
                                        <b> {review.userName}</b>
                                    </div>
                                    <div className="card-body">
                                        <span>
                                            <Rating
                                                className="text-center d-block text-success"
                                                emptySymbol={<i className="bx bx-star bx-tada"></i>}
                                                fullSymbol={
                                                    <i className='bx bxs-star bx-tada' ></i>
                                                }
                                                initialRating={review.rating}
                                                readonly
                                            /></span>
                                        <h5 className="card-title">{review.subject}</h5>
                                        <p className="text-muted fs-6"> <small>{review.comment}.</small> </p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div >
        </div>
    );
};

export default Reviews;