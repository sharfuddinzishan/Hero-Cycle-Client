import React from 'react';
import SingleOrderDetails from '../SingleOrderDetails/SingleOrderDetails';

const SingleOrderModal = (props) => {
    const orderID = props.getOrderID || ''
    const getSingleOrderDetails = props.getSingleOrderDetails || {}
    return (
        <div className="modal fade" id="detailsModal" tabIndex="-1" aria-labelledby="detailsModal" aria-hidden="true">
            <div className="modal-xl modal-fullscreen-sm-down modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn btn-secondary d-block ms-auto" data-bs-dismiss="modal">Close</button>
                    </div>
                    <div className="modal-body">
                        <SingleOrderDetails orderID={orderID} getSingleOrderDetails={getSingleOrderDetails}></SingleOrderDetails>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleOrderModal;