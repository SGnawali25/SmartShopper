import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {composeWithDevTools} from'redux-devtools-extension';
import { productDetailsReducer, productsReducer } from './reducers/productReducers';
import { authReducer, changePasswordReducer, forgotPasswordReducer, registerUserReducer, loadUserReducer} from './reducers/userReducers';

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    // loadUser: loadUserReducer,
    registerUser: registerUserReducer,
    forgotPassword: forgotPasswordReducer,
    changePassword: changePasswordReducer,
})

let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;