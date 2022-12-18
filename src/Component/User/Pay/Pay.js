import { Elements } from '@stripe/react-stripe-js';
import React,{useEffect,useState} from 'react';
import CheckOutForm from '../../CheckOutForm/CheckOutForm';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router';
import axios from 'axios';
const stripePromise = loadStripe('pk_test_51MG8OnLUdVsXgAcpVm4o3fMg9h2K1GdYu6TiS8mOdGWHvxlxNYX0yDZ9Bl9T4O4aPVegfrpIKnMPuE0oUIauQx3t00jNBOknRl');

const Pay = () => {
    const {orderID}=useParams();
    const [getSingleOrderDetails, setSingleOrderDetails] = useState({});
    const [load,setLoad]=useState(false)
    useEffect(() => {
        axios.get(`https://hero-cycle-server-production.up.railway.app/orders/${orderID}`)
            .then(result => {
                console.log(result)
                console.log(result.data)
                if (result.data?.price) {
                    setSingleOrderDetails(result.data);
                    console.log(result.data.price)
                    setLoad(true)
                }
            })
            .catch(() => {
              
            })
    }, [orderID])
    console.log("Payment ID",orderID)
    return (
        <div className="container p-3">
            <h4 className="text-center fw-bold pb-2">Payment Section</h4>
            <p className="display-4 text-center text-warning">
                We Confirm Bkash payment Order By Manually Phone Call</p>
                                              <div className='card w-100'>
{
    load &&                                     <div className="card-body">
                                        <Elements stripe={stripePromise}>
                                            <CheckOutForm orderID={getSingleOrderDetails._id}
                                            OrderPrice={getSingleOrderDetails.price} />
                                        </Elements>
                                    </div>
}
                                </div>
        </div>
    );
};

export default Pay;