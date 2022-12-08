import React from 'react';
import SingleBicycleDetails from '../../SingleBicycleDetails/SingleBicycleDetails';

const SingleCycleModalInfo = (props) => {
    const cycleID = props.getCycleID || ''
    return (
        <div className="modal fade" id="detailsModal" tabIndex="-1" aria-labelledby="detailsModal" aria-hidden="true">
            <div className="modal-xl modal-fullscreen-sm-down modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    <div className="modal-body">
                        {/* Modal For Details of bycycle, got cycleID from Parent State  */}
                        <SingleBicycleDetails cycleID={cycleID}></SingleBicycleDetails>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCycleModalInfo;