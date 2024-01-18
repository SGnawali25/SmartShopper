import React, { Fragment, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'

// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { EMPTY_THE_CART } from '../../constants/cartConstants'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const paymentInfo = {
            id: 1,
            status: true
        }
        order.paymentInfo = paymentInfo;
        dispatch(createOrder(order));
        dispatch({
            type: EMPTY_THE_CART
        })
        navigate("/success")

       
    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <input
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <input
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <input
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment
