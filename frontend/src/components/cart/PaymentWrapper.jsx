import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';
import Payment from './Payment';
import Loader from "../layout/Loader"

const PaymentWrapper = () => {
  const BackendPrefix = import.meta.env.VITE_APP_API_KEY;
  const navigate = useNavigate()
  const alert = useAlert();

  const [stripeApiKey, setStripeApiKey] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function getStripeApiKey() {

      
      try{

        const config = {
          headers: {
              'Content-Type': 'application/json'
          },
          withCredentials: true,
        }

        const url = `${BackendPrefix}/stripeapi`
        const { data } = await axios.get(url, config);
        setStripeApiKey(data.stripeApiKey);
        setLoading(false)

      } catch(error){
        alert.error(error)
        navigate("/")
      }
    }

    getStripeApiKey();
  }, []);

  return (
    <>
    {loading ? <Loader /> : (
      <Elements stripe ={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
    )}
    </>
  );
};

export default PaymentWrapper;
