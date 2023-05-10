import axios from 'axios';
import React, { useEffect, useState } from 'react';
const SingleOrderDetails = (props) => {
    // const orderID = props.orderID
    const getSingleOrderDetails = props?.getSingleOrderDetails || {}
    const [getSingleCycleInfo, setSingleCycleInfo] = useState({});
    let [loadingCycleInfo, setLoadingCycleInfo] = useState(true);

    useEffect(() => {
        setLoadingCycleInfo(true)
        axios.get(`https://hero-cycle-server-side-production.up.railway.app/cycles/${getSingleOrderDetails.cycleID}`)
            .then(result => {
                if (result?.data?.model) {
                    setSingleCycleInfo(result.data);
                    setLoadingCycleInfo(false);
                }
            })
            .catch(() => {
                setLoadingCycleInfo(false);
            })
    }, [getSingleOrderDetails.cycleID])



    return (
        <div className="container p-3">
            <h1 className="text-center">Details of <span className="fw-bold text-info">{!loadingCycleInfo && getSingleCycleInfo.model}</span></h1>
            <div className="row">
                {
                    !loadingCycleInfo && <>
                        <div className="col-12 col-md-3">
                            <img className="img-fluid" src={getSingleCycleInfo.picture} alt="" />
                            <h6 className="text-success fw-bold">Shipping Address</h6>
                            <p className="text-muted"><small>{getSingleOrderDetails.shippingAddress}</small></p>
                        </div>
                        <div className="col-12 col-md-9">
                            <table id="all-bicycles" className="ms-auto table able-sm w-75">
                                <tbody>
                                    <tr>
                                        <th scope="col">Model</th>
                                        <th className="fw-normal" scope="col">
                                            <h6>
                                                {getSingleOrderDetails.model}
                                                <span className="badge bg-warning">{getSingleOrderDetails.orderStatus}</span>
                                            </h6>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Order By</th>
                                        <th className="fw-normal" scope="col">{getSingleOrderDetails.orderBy}</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Price</th>
                                        <th className="fw-normal" scope="col">{getSingleOrderDetails.price} Taka</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Frame</th>
                                        <th className="fw-normal" scope="col">{getSingleCycleInfo.frameSize}</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Weight</th>
                                        <th className="fw-normal" scope="col">{getSingleCycleInfo.weight}</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Material</th>
                                        <th className="fw-normal" scope="col">{getSingleCycleInfo.material}</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Prefer Age</th>
                                        <th className="fw-normal" scope="col">{getSingleCycleInfo.preferAge}</th>
                                    </tr>
                                    <tr
                                    ><th scope="col">Gender</th>
                                        <th className="fw-normal" scope="col">{getSingleCycleInfo.gender}</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">category</th>
                                        <th className="fw-normal" scope="col">{getSingleCycleInfo.category}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {
                            getSingleOrderDetails.orderNote && <div className="col-12">
                                <h3>Your Query</h3>
                                <p className="text-muted">{getSingleOrderDetails.orderNote}</p>
                            </div>
                        }
                        <div className="col-12">
                            <h3>Overview</h3>
                            <p className="text-muted">{getSingleCycleInfo.overview}</p>
                        </div>
                    </>
                }
            </div>
        </div >
    );
};

export default SingleOrderDetails;