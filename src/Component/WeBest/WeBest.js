import React from 'react';

const WeBest = () => {
    return (
        <div className="container px-4 py-5" id="icon-grid">
            <h1 className="pb-2 border-bottom text-center text-center">
                Why <span className="text-primary fw-bold">Us?</span>
            </h1>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                <div>
                    <span className="bi text-muted flex-shrink-0 me-3">
                        <i className="fas fa-tools"></i>
                    </span>
                    <h4 className="fw-bold mb-0">FREE SUPPORT</h4>
                    <p>Hero Bike have selected the best reviewed and most
                        trusted bike mechanics.</p>
                </div>
                <div>
                    <span className="bi text-muted flex-shrink-0 me-3">
                        <i className="fas fa-handshake"></i>
                    </span>
                    <h4 className="fw-bold mb-0">Extended Return Policy</h4>
                    <p>Free 14 Days Bike Return</p>
                </div>
                <div>
                    <span className="bi text-muted flex-shrink-0 me-3">
                        <i className="fas fa-hand-holding-usd"></i>
                    </span>
                    <h4 className="fw-bold mb-0">Earn 2x Rewards Points</h4>
                    <p>Reward Point Can Be Reedem For Next Buy.</p>
                </div>
                <div>
                    <span className="bi text-muted flex-shrink-0 me-3">
                        <i className="fas fa-handshake"></i>
                    </span>
                    <h4 className="fw-bold mb-0">Free Shipping</h4>
                    <p>Enjoy Free Shipping In Dhaka City</p>
                </div>
            </div>
        </div >
    );
};

export default WeBest;