import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import SingleOrderModal from '../../Shared/SingleOrderModal/SingleOrderModal';
import UpdateOrders from '../../Shared/UpdateOrders/UpdateOrders';
import MyOrder from '../MyOrder/MyOrder';

const MyOrders = () => {
    const [getOrderID, setOrderID] = useState('');
    const [getSingleOrderDetails, setSingleOrderDetails] = useState({});
    let [refreshed, setRefreshed] = useState(false)
    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(false);
    const { user } = useAuth()

    useEffect(() => {
        setLoader(true);
        let url = `http://localhost:4000/user/orders?email=${user?.email}`
        axios.get(url)
            .then(result => {
                console.log(result?.data.length)
                if (result.data.length) {
                    setOrders(result.data)
                    setLoader(false)
                }
            })
            .catch(e => { })
            .finally(() => { setLoader(false) });
    }, [refreshed,user.email])
    const token = localStorage.getItem('tokenID')
    let headers = {
        "authorization": 'Bearer ' + token
    };

    const handleCancel = (orderID, orderStatus) => {
        const prompt = window.confirm('Want To Cancel  Order?');
        if (prompt === true) {
            setRefreshed(false);
            
                axios.put(`http://localhost:4000/order/${orderID}?action=cancel`, { headers })
                    .then(result => {
                        // console.log(result)
                        if (result.data.modifiedCount === '0') { alert('Failed'); setRefreshed(false) }
                        else setRefreshed(true);
                    })
                    .catch(() => setRefreshed(false))
                    .finally(() => {
                        // setRefreshed(false);
                    })
        }
    }

    const handleDelete = (orderID, orderStatus) => {
        const prompt = window.confirm('Want To Delete  Order?');
        if (prompt === true) {
            setRefreshed(false);
            // console.log(headers)
            orderStatus !== 'confirm' && axios.delete(`http://localhost:4000/order/${orderID}`, { headers })
                .then(result => {
                    // console.log(result)
                    if (result.data.deletedCount === '0') { alert('Failed'); setRefreshed(false) }
                    else setRefreshed(true);
                })
                .catch(() => setRefreshed(false))
                .finally(() => {
                    // setRefreshed(false);
                })
        }
    }

    return (
        <>
            <h4 className="py-2">My Orders ({user?.email})</h4>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {
                    !loader && <>
                        {
                            orders.map(order => {
                                return <div className="col" key={order._id}>
                                    <div className="card">
                                        <button
                                            type="button"
                                            className="btn-close btn-close-black d-block ms-auto"
                                            aria-label="Close"
                                            onClick={() => handleCancel(order._id, order.orderStatus)}
                                            disabled={
                                                order.orderStatus === 'cancel' || order.orderStatus === 'confirm'
                                                    ? true : false}
                                        >
                                        </button>
                                        <MyOrder setSingleOrderDetails={setSingleOrderDetails} setOrderID={setOrderID} order={order}></MyOrder>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-warning"
                                            onClick={() => handleCancel(order._id, order.orderStatus)}
                                            disabled={
                                                order.orderStatus === 'cancel' || order.orderStatus === 'confirm'
                                                    ? true : false}
                                        >
                                            Cancel Order
                                        </button>
                                        <button
                                            type="button"
                                            id="adminCycleUpdateBtn"
                                            className="btn btn-sm btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            onClick={() => { setOrderID(order._id); }}
                                            disabled={
                                                order.orderStatus === 'confirm'
                                                    ? true : false}
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(order._id, order.orderStatus)}
                                            disabled={order.orderStatus === 'confirm' ? true : false}
                                        >
                                            Delete Order
                                        </button>
                                    </div>
                                </div>
                            })
                        }
                    </>
                }
            </div>
            {
                <>
                    <UpdateOrders setRefreshed={setRefreshed} getOrderID={getOrderID}></UpdateOrders>
                    <SingleOrderModal getSingleOrderDetails={getSingleOrderDetails}></SingleOrderModal>
                </>
            }
        </>
    );
};

export default MyOrders;