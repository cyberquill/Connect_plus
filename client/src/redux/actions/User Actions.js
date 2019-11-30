import {
    AUTH_SET_USER,
    AUTH_UNSET_USER,
    GET_ERRORS,
    AUTH_ERROR,
    RESET_ERRORS,
    NETWORK_ERROR,
} from '../types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import isEmpty from '../../validation/isEmpty';
import setAuthToken from '../../utils/setAuthToken';

export const createUser = (newUser, history) => dispatch => {
    axios
        .post('/auth/signup', newUser)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            dispatch({ type: RESET_ERRORS });
            history.push('/dashboard');
        })
        .catch(err => {
            if (!isEmpty(err.response))
                dispatch({
                    type: AUTH_ERROR,
                    payload: err.response.data,
                });
            else if (!err.status)
                dispatch({
                    type: NETWORK_ERROR,
                    payload: { request: 'failed' },
                });
            else
                dispatch({
                    type: GET_ERRORS,
                    payload: err,
                });
        });
};

export const loginUser = (user, history) => dispatch => {
    axios
        .post('/auth/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            dispatch({ type: RESET_ERRORS });
            history.push('/dashboard');
        })
        .catch(err => {
            if (!isEmpty(err.response))
                dispatch({
                    type: AUTH_ERROR,
                    payload: err.response.data,
                });
            else if (!err.status)
                dispatch({
                    type: NETWORK_ERROR,
                    payload: { request: 'failed' },
                });
            else
                dispatch({
                    type: GET_ERRORS,
                    payload: err,
                });
        });
};

export const googleLogin = (user, history) => dispatch => {
    dispatch(setCurrentUser(user));
    history.push('/dashboard');
};

export const logoutUser = history => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch({ type: AUTH_UNSET_USER });
    history.push('/');
};

export const setCurrentUser = user => {
    return {
        type: AUTH_SET_USER,
        payload: user,
    };
};
