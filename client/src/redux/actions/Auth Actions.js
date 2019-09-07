import { GET_ERRORS, AUTH_USER_NATIVE, NETWORK_ERROR } from './types';
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
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            else if (!err.status)
                dispatch({
                    type: NETWORK_ERROR,
                    payload: { request: 'failed' },
                });
            else
                dispatch({
                    type: NETWORK_ERROR,
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
            history.push('/dashboard');
        })
        .catch(err => {
            if (!isEmpty(err.response))
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            else if (!err.status)
                dispatch({
                    type: NETWORK_ERROR,
                    payload: { request: 'failed' },
                });
            else
                dispatch({
                    type: NETWORK_ERROR,
                    payload: err,
                });
        });
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
