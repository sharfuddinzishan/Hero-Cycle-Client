import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
    return (
        <>
            <section className="banner-section p-5">
                <div className="row mt-5">
                    <div className="col">
                        <div className="overflow-hidden">
                            <h5 className="section-title lh-1 fs-1 fw-normal">
                                Find Your Perfect Match<br />
                                <b>Hero Cycle</b></h5>
                            <p className="animated slideInLeft delay-1s text-light fw-bold display-5">
                                Experience The World <br />Of Hero Cycle Store
                            </p>
                            <Link to="/bicycles">
                                <button className="my-1 animated zoomIn delay-0.5s btn btn-lg btn-secondary">Hero Cycles</button>
                            </Link>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Banner;