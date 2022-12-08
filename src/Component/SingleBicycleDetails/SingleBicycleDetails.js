import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const SingleBicycleDetails = (props) => {
    const { isAdmin, user } = useAuth()
    let cycleID;
    let { bicycleID } = useParams();

    if (props.cycleID)
        cycleID = props.cycleID
    else
        cycleID = bicycleID

    const [getSingleCycleInfo, setSingleCycleInfo] = useState({});
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        axios.get(`https://hero-cycle-server-side-production.up.railway.app/cycles/${cycleID}`)
            .then(result => {
                if (result?.data?.model) {
                    setSingleCycleInfo(result.data);
                    setLoading(false)
                }
            })
            .catch(() => {
                setLoading(false)
            })
    }, [cycleID])

    return (
        <div className="container p-3">
            <h1 className="text-center">Details of <span className="fw-bold text-info">{getSingleCycleInfo.model}</span></h1>
            <div className="row">
                {
                    !loading && <>
                        <div className="col-12 col-md-5">
                            <img className="img-fluid" src={getSingleCycleInfo.picture} alt="" />
                        </div>
                        <div className="col-12 col-md-7">
                            <table id="all-bicycles" className="ms-auto table able-sm w-75">
                                <tbody>
                                    <tr>
                                        <th scope="col">Model</th>
                                        <th className="fw-normal" scope="col">{getSingleCycleInfo.model}</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Price</th>
                                        <th className="fw-normal" scope="col">{getSingleCycleInfo.price}</th>
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
                                        <th scope="col">Age+</th>
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
                                    {
                                        (!isAdmin && user?.email) && <tr>
                                            <th colSpan="2">
                                                <Link to={`/ordernow/${getSingleCycleInfo._id}`}>
                                                    <button className='btn btn-primary d-block mx-auto'>Order Now!</button>
                                                </Link>
                                            </th>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
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

export default SingleBicycleDetails;