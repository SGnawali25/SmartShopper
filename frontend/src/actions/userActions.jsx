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
    LOGOUT_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL
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
        const token = data.token;
        localStorage.setItem('token', token)

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
export const register = (userData) => async(dispatch) => {
    try{
        dispatch({type: REGISTER_USER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }
        const {data} = await axios.post(`/api/v1/register`,userData, config);

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

        await axios.get(`/api/v1/logout`, config);

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

//forgot password
export const forgotPassword = (email) => async(dispatch) => {
    try{
        dispatch({type: FORGOT_PASSWORD_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }

        const {data} = await axios.post(`/api/v1/password/reset`, {email}, config);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error){
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//reset password
export const resetPassword = (token, password, confirmPassword) => async(dispatch) => {
    try{
        dispatch({type: RESET_PASSWORD_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }

        const {data} = await axios.put(`/api/v1/password/reset/${token}`, {password, confirmPassword}, config)

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}



export const changePassword = (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    try{
        dispatch({type: CHANGE_PASSWORD_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }

        const {data} = await axios.put(`/api/v1/password/change`, {currentPassword, newPassword, confirmNewPassword}, config);

        dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error){
        dispatch({
            type: CHANGE_PASSWORD_FAIL,
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