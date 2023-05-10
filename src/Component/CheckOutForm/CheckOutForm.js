import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React,{useState,useEffect} from 'react';

const CheckOutForm = ({orderID,OrderPrice}) => {
    const stripe=useStripe()
    const elements =useElements()
    const [cardError,setCardError]=useState('')
    const [success,setSuccess]=useState('')
    const [transactionID,setTransactionId]=useState('')
    const [clientSecret,setClientSecret]=useState('')
    

    const price =+OrderPrice ||1220
    // const price =1220
    const getOrderId=orderID

    
    useEffect(()=>{
                axios.post('https://hero-cycle-server-side-production.up.railway.app/create-payment-intent', {price})
            .then(data => {
                console.log('Data ',data)
               if(data.data?.clientSecret){
                setClientSecret(data.data.clientSecret);
                console.log('Client ',data.data.clientSecret)
            }
            })
            .catch(e => console.log('Error Mssg ',e.message))
    },[price,getOrderId]);


    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(!stripe || !elements) {return;}
        const card=elements.getElement(CardElement)
        if (card===null){return;}
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card:card,
        });
        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('')
        }

        setSuccess('')
        //Confirm Card Payment
        const {paymentIntent, error:intentError} = await stripe.confirmCardPayment(clientSecret,
  {
    payment_method: {
      card,
      billing_details: {
        email: 'sharfuddin.ahamed91@gmail.com'
      },
    },
  },
);

if(intentError){
    setCardError(intentError);
}
else{
    setCardError('');
    console.log("Payment Intet",paymentIntent);
    setTransactionId(paymentIntent.id)
    setSuccess('Payment Completed')
    const transationDetails={
    transactionID:paymentIntent.id,
    getOrderId:getOrderId
}
    axios.put(`https://hero-cycle-server-side-production.up.railway.app/payment/order`, {transationDetails})
            .then(result => {
                if (result.data.status === 401) { console.log('Payment Failed') }
                else {
                    setSuccess(true)
                    console.log('Success Payment')
                }
            })
            .catch()
            .finally()
}




    }
    return (
        <>
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-success btn-sm mt-3' type="submit" disabled={!stripe || !clientSecret|| success}>
        Pay
      </button>
    </form>
    {
        cardError && <p className='text-danger fw-bold fs-2 text-center'>{cardError}</p>
    }
    {
        success && <p className='text-success fw-bold fs-2 text-center'>{success} <span> keep This Transaction Id: {transactionID}</span></p>
    }
        </>
    );
};

export default CheckOutForm;