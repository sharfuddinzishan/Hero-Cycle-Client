import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
    return (
        <>
            <section className="section404 p-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 d-flex flex-column justify-content-center">
                            <h2 className="section-title lh-1 fs-1 pb-3 fw-normal text-start">
                                Sorry, we couldn't find what you're looking for.
                            </h2>
                            <p className="text-muted text-start">The page or post may have been removed.</p>
                            <Link to="/">
                                <button className="mt-3 d-block mx-auto btn btn-lg btn-outline-warning text-primary">Back
                                    To Home
                                    Page</button>
                            </Link>
                        </div>
                        <div className="col-md-5">
                            <img src="https://i.ibb.co/GJh6j8k/img-couch-2x.png"
                                className="w-100 img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NotFound;