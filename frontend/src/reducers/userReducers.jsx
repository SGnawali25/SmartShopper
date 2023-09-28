import{
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_FAIL,
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

export const authReducer = (state = {user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }

        case LOGIN_FAIL:
            return {
                ...state,
                loading : false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                loading : false,
                error: action.payload
            }
        

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const loadUserReducer = (state = {user: {} }, action) => {
    switch (action.type) {
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }

        case LOAD_USER_SUCCESS:
            return {
               ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
                }
        

        case LOAD_USER_FAIL:
            return{
                loading:false,
                isAuthenticated:false,
                user:null,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
               ...state,
                error: null
            }

        default:
            return state;
    }
}

export const registerUserReducer = (state = {user: {} }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }

        case REGISTER_USER_SUCCESS:
            return {
               ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }
        

        
        case REGISTER_USER_FAIL:
            return {
                loading:false,
                isAuthenticated:false,
                user:null,
                error: action.payload
            }

        case LOGOUT_SUCCESS:
            return{
                loading:false,
                isAuthenticated:false,
                user: null
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const forgotPasswordReducer = (state = { }, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                loading: true
            }

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case RESET_PASSWORD_FAIL:
        case FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case RESET_PASSWORD_SUCCESS:
            return{
                ...state, 
                success : action.payload.success,
                loading: false,
                message : action.payload.message,
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const changePasswordReducer = (state = { }, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_REQUEST:
            return {
                loading: true
            }

        case CHANGE_PASSWORD_SUCCESS:
            return {
               ...state,
                loading: false,
                message: action.payload
            }
        case CHANGE_PASSWORD_FAIL:
            return {
               ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
               ...state,
               message: null,
                error: null
            }

        default:
            return state;
    }
}