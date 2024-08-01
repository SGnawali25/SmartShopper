import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';

const PaymentWrapper = () => {
  const BackendPrefix = import.meta.env.VITE_APP_API_KEY;
  const navigate = useNavigate()
  const alert = useAlert();

  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {

    async function getStripeApiKey() {

      const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
      }
      try{
        const { data } = await axios.get(`${BackendPrefix}/stripeapi`, config);
        setStripeApiKey(data.stripeApiKey);

      } catch(error){
        alert.error(error)
        navigate("/")
      }
    }

    getStripeApiKey();
  }, []);

  return (
    <Elements stripe ={loadStripe(stripeApiKey)}>
      <Payment />
    </Elements>
  );
};

export default PaymentWrapper;
