import axios from 'axios';
import isEmpty from '../../validation/isEmpty';
import {
    SEARCHING,
    SEARCHED,
    SEARCH_RESET,
    SEARCH_ERROR,
    GET_ERRORS,
    NETWORK_ERROR,
    RESET_ERRORS,
} from '../types';

export const search = (query, history, route) => (dispatch, getState) => {
    dispatch({ type: SEARCHING });
    axios
        .post(`/search/${query}`)
        .then(res => {
            dispatch({
                type: SEARCHED,
                payload: res.data,
            });
            history.push(route);
        })
        .catch(err => {
            if (!isEmpty(err.response))
                dispatch({
                    type: SEARCH_ERROR,
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

export const resetSearch = () => (dispatch, getState) => {
    dispatch({ type: SEARCH_RESET });
};
