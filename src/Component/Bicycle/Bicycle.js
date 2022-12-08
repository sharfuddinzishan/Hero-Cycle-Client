import React from 'react';
import { Link } from 'react-router-dom';

const Bicycle = (props) => {
    const {
        _id: cycleID,
        model,
        overview,
        picture,
        price,
        frameSize,
        weight,
        category, } = props.cycle || {}


    return (
        <div className="col">
            <div className="card h-100">
                <img src={picture} className="card-img-top p-3" alt="Not Available" style={{ height: '200px' }} />
                <div className="card-body">
                    <h5 className="card-title text-center">{model}</h5>
                    <p className="card-text">{overview.slice(0, 60) + '....'}</p>
                    <p className="fw-bold fs-5">Price: <span className="text-info">{price}</span></p>
                </div>
                <ul className="list-group list-group-flush list-group-numbered">
                    <li className="list-group-item ps-3 py-0"><small>Frame Size: {frameSize}</small></li>
                    <li className="list-group-item ps-3 py-0"><small>Net Weight(g): {weight}</small></li>
                    <li className="list-group-item ps-3 py-0"><small>Category: {category}</small></li>
                </ul>
                <div className="card-footer text-center">
                    <Link to={`/bicycles/${cycleID}`}><button className="btn btn-sm btn-primary">Details</button></Link>
                    <Link to={`/ordernow/${cycleID}`}><button className="btn btn-sm btn-primary ms-2 bx bx-tada">Order Now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Bicycle;