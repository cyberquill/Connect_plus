import { GET_ERRORS, AUTH_USER_NATIVE, AUTH_ERROR, RESET_ERRORS, NETWORK_ERROR } from '../types';
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
            setTimeout(() => {
                dispatch({ type: RESET_ERRORS });
            }, 5000);
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
            setTimeout(() => {
                dispatch({ type: RESET_ERRORS });
            }, 5000);
        });
};

export const googleLogin = newUser => dispatch => {
    dispatch(setCurrentUser(newUser));
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};

export const setCurrentUser = user => {
    return {
        type: AUTH_USER_NATIVE,
        payload: user,
    };
};
