import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import './OrderNow.css'

const OrderNow = () => {

//     const cycles=[
//         {
//             _id:1,
//             model:"X-Factor 26T",
//             price:"7625"
//         },
//         {
//             _id:2,
//             model:"THORN 26T 21SPD FS",
//             price:"12985"
//         },
//         {
//             _id:3,
//             model:"MASSIVE 20T SS DD",
//             price:"7770"
//         },
//     ]

//     /* Find Details of cycleID 2 
//     which is ordered by user */
//     let orderedCycleID=2
//     let orderedCycleDetails=cycles.find(data=>data._id=orderedCycleID)
//     console.log(orderedCycleDetails)

//     /* Get sum of all cycles price 
//     or ordered cycles price of total */
//     let total=cycles.reduce((sum,data)=>sum+=+data.price,0)
//     console.log(total)

//     /* Double the value of each array 
//     and stored in another array 
//     Note: map return an array*/
//     let newCycles=cycles.map(data=>data.price*2)
//     console.log(newCycles)

//   /* Double the value of each array 
//     and consoled each value.
//     Note: forEach not return any value */
//     cycles.forEach(data=>console.log(data.price*2))


    const { user,isAdmin } = useAuth()
    console.log('Admin ', isAdmin)
    console.log('User ', user)
    let history=useHistory()
    let { cycleID } = useParams();

    const [getSingleCycleInfo, setSingleCycleInfo] = useState({});
    const [singleCycle, setSingleCycle] = useState({})

    let [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const token = localStorage.getItem('tokenID')
    let headers = {
        "authorization": 'Bearer ' + token
    };
    
    useEffect(() => {
        setLoading(true)
        axios.get(`https://hero-cycle-server-production.up.railway.app/cycles/${cycleID}`)
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

    const handleInput = e => {
        const copyCycle = { ...singleCycle };
        copyCycle[e.target.name] = e.target.value;
        setSingleCycle(copyCycle);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const copyCycle = { ...singleCycle };
        copyCycle['email'] = user?.email;
        copyCycle['orderBy'] = copyCycle.orderBy || user?.displayName;
        copyCycle['price'] = getSingleCycleInfo?.price;
        copyCycle['model'] = getSingleCycleInfo?.model;
        copyCycle['cycleID'] = getSingleCycleInfo?._id;
        copyCycle['orderStatus'] = 'pending';

        console.log(copyCycle)
        console.log(singleCycle)

        setLoading(true)
        setSuccess(false)
        setError(false)

        axios.post('https://hero-cycle-server-production.up.railway.app/order', copyCycle, { headers })
            .then(result => {
                if (result.data.status === 401) { setError(true) }
                else {
                    setSuccess(true)
                    history.replace('/dashboard/user/show/orders')
                }
            })
            .catch(e => setError(true))
            .finally(() => setLoading(false))
    };

    return (
        <div id="orderNow" className="container-fluid py-3 px-5">
            <div className="row">
                {
                    loading  && <span className='fs-3 fw-bold text-info'>Loading Information.....</span>
                }
                {
                    !loading && <>
                        {/* Start of Order Form  */}
                        <div className="col-12 col-md-9">
                            <h1 className="text-center mb-2">Now Order ! <span className="fw-bold text-info">{getSingleCycleInfo.model}</span></h1>
                            <h3 className="text-center fw-bolder">BILLING DETAILS</h3>
                            {
                                success && <div className="alert alert-sm alert-success alert-dismissible fade show" role="alert">
                                    <strong>Ordered!</strong> Cycle.
                                    <button type="button" onClick={() => setSuccess(false)} className="btn-close"
                                        data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            }
                            {
                                error && <div className="alert alert-sm alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Failed!</strong> To Update Cycle.
                                    <button type="button" onClick={() => setError(false)} className="btn-close" data-bs-dismiss="alert"
                                        aria-label="Close"></button>
                                </div>
                            }
                            <form id="updateCycleForm" onSubmit={handleSubmit} autoComplete="off">
                                <div className="d-flex gap-3 flex-column flex-sm-row">
                                    <div className="mb-0 mb-md-1">
                                        <label htmlFor="orderBy" className="form-label fs-6 fw-bold">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="orderBy"
                                            name="orderBy"
                                            placeholder="Provide Your Name"
                                            required
                                            onBlur={handleInput}
                                            defaultValue={user?.displayName}
                                        />
                                    </div>
                                    <div className="mb-0 mb-md-1">
                                        <label htmlFor="email" className="form-label fs-6 fw-bold">Email</label>
                                        <input
                                            type="email"
                                            className="form-control-plaintext"
                                            id="email"
                                            defaultValue={user?.email}
                                            readOnly
                                        />
                                    </div>
                                <div className="mb-0 mb-md-1">
                                    <label htmlFor="contactNumber" className="form-label fs-6 fw-bold">Contact Number</label>
                                    <input
                                        type="phone"
                                        className="form-control form-control-sm"
                                        id="contactNumber"
                                        name="contactNumber"
                                        placeholder="Provide Your Mobile Number"
                                        required
                                        defaultValue={user?.phoneNumber}
                                        onBlur={handleInput}
                                    />
                                </div>
                                    <div className="mb-0 mb-md-1">
                                        <label htmlFor="price" className="form-label fs-6 fw-bold">Total Price (Taka)</label>
                                        <input
                                            type="number"
                                            className="form-control-plaintext "
                                            id="price"
                                            name="price"
                                            defaultValue={getSingleCycleInfo?.price}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="mb-0 mb-md-1">
                                    <label htmlFor="shippingAddress" className="form-label fs-6 fw-bold">Shipping Address</label>
                                    <textarea
                                        type="text"
                                        className="form-control form-control-sm"
                                        rows="4"
                                        id="shippingAddress"
                                        name="shippingAddress"
                                        placeholder="Provide Shipping Address"
                                        required
                                        onBlur={handleInput}
                                    />
                                </div>
                                <div className="mb-0 mb-md-1">
                                    <label htmlFor="orderNotes" className="form-label fs-6 fw-bold">Transaction Related Information</label>
                                    <textarea
                                        className="form-control form-control-sm"
                                        rows="3"
                                        id="orderNotes"
                                        name="orderNotes"
                                        placeholder="Provide Transaction Number"
                                        required
                                        onBlur={handleInput}
                                    />
                                </div>
                                {
                                    !isAdmin && user?.email && <button className="d-block ms-auto btn btn-primary fw-bold">Checkout</button>
                                }
                            </form>
                        </div>
                        {/* End Of Order Form  */}
                        <div className="col-12 col-md-3">
                            <img src={getSingleCycleInfo?.picture} className="img-fluid bg-info rounded-pill mb-1 img-thumbnail" alt="" />
                            <div className="accordion mb-2" id="accordionExample">
                                <div className="accordion-item border-2 border-top">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                            Price
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-black-50">
                                            The price of <b>{getSingleCycleInfo.model.toUpperCase()}</b> is expected to be <span className="fs-4 fw-bold text-info">{getSingleCycleInfo.price}</span> Taka.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-2 border-top">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                            What is Frame Size in unit of CM?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-black-50">
                                            {getSingleCycleInfo.frameSize}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-2 border-top">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                            Material
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                                        data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-black-50">
                                            {getSingleCycleInfo.material}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-2 border-top">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            Net Weight
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour"
                                        data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-black-50">
                                            {getSingleCycleInfo.weight}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-2 border-top">
                                    <h2 className="accordion-header" id="headingFive">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                            Perfect Age For This Bicycle?
                                        </button>
                                    </h2>
                                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive"
                                        data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-black-50">
                                            {getSingleCycleInfo.preferAge}+
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <p className="text-muted bg-warning border rounded-3 p-5 my-3">
                                <span className="text-danger fw-bold fs-4">Disclaimer</span>
                                <br />
                                Above mentioned information is not 100% accurate.
                                There is always having a chance to make a mistake
                                to adding information. Generally we collect information
                                from manufacturer website and other reputed sources.
                                Please inform us if you have found any mistake or wrong
                                information.
                                <br />
                                Due to continuous innovation and improvements,
                                Specification is subject to change without notice.
                                Accessories shown in the picture may or may not be a
                                part of the standard equipment with the bike. Model
                                available in Multi Speed also.
                            </p>
                        </div>
                    </>
                }
            </div>
        </div >
    );
};


export default OrderNow;