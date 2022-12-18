import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from './../../../Hooks/useAuth';

const MyReviews = () => {
    const {user}=useAuth()
    const [loadingReview, setLoadingReview] = useState(true);
    // const [reviewAction, setReviewAction] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`https://hero-cycle-server-production.up.railway.app/user/reviews?email=${user?.email}`)
            .then(result => {
                if (result.data) {
                    setReviews(result.data)
                    setLoadingReview(false);
                }
            })
            .catch(() => {setLoadingReview(true) })
    }, [user.email,loadingReview])

    const handleReviewDelete = (reviewID) => {
        const token = localStorage.getItem('tokenID')
        let headers = {
            "authorization": 'Bearer ' + token
        };

        const isAllowed = window.confirm('Do You Want To Removed Your Comment/Review?');
        if (!isAllowed) {
            return
        }
        else {
            // setReviewAction(false);
            setLoadingReview(true);
            axios.delete(`https://hero-cycle-server-production.up.railway.app/reviews/${reviewID}`, { headers })
                .then(result => {
                    if (result.data.deletedCount) {
                        // setReviewAction(true);
                        setLoadingReview(false);
                    }
                })
                .catch(() => {setLoadingReview(true) })
                .finally()
        }
    }

    return (
        <>
            <table className="table caption-top">
                <caption>List of Reviews</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Review By</th>
                        <th scope="col">Email</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loadingReview && <> <div className="spinner-grow text-primary text-center" role="status">
                            <span className="visually-hidden">Loading Reviews</span>
                        </div>
                            <div className="spinner-grow text-primary text-center" role="status">
                                <span className="visually-hidden">Loading Reviews</span>
                            </div>
                        </>
                    }
                    {
                        !loadingReview && reviews.map((review, index) => {
                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{review.subject}</td>
                                <td>{review.comments}</td>
                                <td>{review.rating}</td>
                                <td>{review.userName}</td>
                                <td>{review.email}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleReviewDelete(review._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    );
};

export default MyReviews;