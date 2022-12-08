import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import SingleOrderModal from '../../Shared/SingleOrderModal/SingleOrderModal';
import UpdateOrders from '../../Shared/UpdateOrders/UpdateOrders';
import AllOrder from '../AllOrder/AllOrder';
import './AllOrders.css'

const AllOrders = () => {
    const [getOrderID, setOrderID] = useState('');
    const [getSingleOrderDetails, setSingleOrderDetails] = useState({});
    // If Any Update Delete Performed then page re-render by this which used as dependency 
    let [refreshed, setRefreshed] = useState(false)
    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(false);
    const { user } = useAuth()

    useEffect(() => {
        setLoader(true);
        let url = `https://hero-cycle-server-side-production.up.railway.app/user/orders`
        axios.get(url)
            .then(result => {
                if (result.data.length) {
                    setOrders(result.data)
                    setLoader(false)
                }
            })
            .catch(e => { })
            .finally(() => { setLoader(false) });
    }, [refreshed])

    const token = localStorage.getItem('tokenID')
    let headers = {
        "authorization": 'Bearer ' + token
    };

    const handleCancel = (orderID, orderStatus) => {
        const prompt = window.confirm('Want To Cancel  Order?');
        if (prompt === true) {
            setRefreshed(false);
            orderStatus === 'cancel' ||
                axios.put(`https://hero-cycle-server-side-production.up.railway.app/order/${orderID}?action=cancel`, { headers })
                    .then(result => {
                        console.log(result)
                        if (result.data.modifiedCount === '0') { alert('Failed'); setRefreshed(false) }
                        else setRefreshed(true);
                    })
                    .catch(() => setRefreshed(false))
                    .finally(() => {
                        setRefreshed(false);
                    })
        }
    }

    const handleDelete = (orderID) => {
        const prompt = window.confirm('Want To Delete  Order?');
        if (prompt === true) {
            setRefreshed(false);
            console.log(headers)
            axios.delete(`https://hero-cycle-server-side-production.up.railway.app/order/${orderID}`, { headers })
                .then(result => {
                    console.log(result)
                    if (result.data.deletedCount === '0') { alert('Failed'); setRefreshed(false) }
                    else setRefreshed(true);
                })
                .catch(() => setRefreshed(false))
                .finally(() => {
                    setRefreshed(false);
                })
        }
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-12 m-0 p-0 table-responsive">
                    <table id="all-orders" className="table table-striped table-hover table-sm caption-top">
                        <caption>My Orders ({user?.email})</caption>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col"> Model</th>
                                <th scope="col"> Price(BDT)</th>
                                <th scope="col"> Email</th>
                                <th scope="col"> OrderBy</th>
                                <th scope="col"> Status</th>
                                <th scope="col"> Cancel</th>
                                <th scope="col"> Update</th>
                                <th scope="col"> Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !loader ? <>
                                    {
                                        orders?.map((order, index) => {

                                            return <tr key={order._id}>
                                                <th scope="row">{index + 1}</th>
                                                <AllOrder setSingleOrderDetails={setSingleOrderDetails} setOrderID={setOrderID} order={order}></AllOrder>

                                                <td>
                                                    <button
                                                        type="button"
                                                        id="adminOrderCancelBtn"
                                                        className="btn btn-sm btn-warning"
                                                        onClick={() => handleCancel(order._id, order.orderStatus)}
                                                        disabled={
                                                            order.orderStatus === 'cancel'
                                                                ? true : false}
                                                    >
                                                        Cancel Order
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        id="adminOrderUpdateBtn"
                                                        className="btn btn-sm btn-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#staticBackdrop"
                                                        onClick={() => { setOrderID(order._id); }}
                                                    >
                                                        Update
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        id="adminOrderDeleteBtn"
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDelete(order._id)}
                                                    >
                                                        Delete Order
                                                    </button>
                                                </td>
                                            </tr>
                                        })}
                                </> : <tr></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                <>
                    <UpdateOrders setRefreshed={setRefreshed} getOrderID={getOrderID}></UpdateOrders>
                    <SingleOrderModal getSingleOrderDetails={getSingleOrderDetails} getOrderID={getOrderID}></SingleOrderModal>
                </>
            }

        </div>
    );
};

export default AllOrders;