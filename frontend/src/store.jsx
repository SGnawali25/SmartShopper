import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {composeWithDevTools} from'redux-devtools-extension';
import { productDetailsReducer, productsReducer, newProductReducer, productReviewsReducer, reviewReducer, newReviewReducer, productReducer } from './reducers/productReducers';
import { allUsersReducer,userReducer, authReducer, changePasswordReducer,forgotPasswordReducer, registerUserReducer, userDetailsReducer} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import {newOrderReducer, myOrdersReducer, allOrdersReducer, orderDetailsReducer, orderReducer} from "./reducers/orderReducers"

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    auth: authReducer,
    registerUser: registerUserReducer,
    forgotPassword: forgotPasswordReducer,
    changePassword: changePasswordReducer,
    cart: cartReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    newReview: newReviewReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
    product: productReducer
    
})

let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;