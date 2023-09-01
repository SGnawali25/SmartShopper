import axios from 'axios';

import{
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../constants/userConstants';

//Login
export const login = (email, password) => async (dispatch) => {
    try{

        dispatch({type: LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }

        const {data} = await axios.post(`/api/v1/login`, {email, password} ,  config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,

        })


    } catch (error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

//register user
export const register = (name, email, password) => async(dispatch) => {
    try{
        dispatch({type: REGISTER_USER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }
        const {data} = await axios.post(`/api/v1/register`,{name, email, password}, config);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })


    }catch(error){
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })

    }

}

//load user
export const loadUser = () => async(dispatch) => {
    try{
        dispatch({type: LOAD_USER_REQUEST})

        const config = {withCredentials: true}

        const {data} = await axios.get(`/api/v1/me`, config);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })


    }catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })

    }

}



//logout user
export const logout = () => async(dispatch) => {
    try{

        const config = {withCredentials: true}

        await axios.get(`http://localhost:4000/api/v1/logout`, config);

        dispatch({
            type: LOGOUT_SUCCESS,
        })


    }catch(error){
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })

    }

}

//clear errors
export const clearErrors = () => async (dispatch) => {

    dispatch({
            type: CLEAR_ERRORS
        })
}