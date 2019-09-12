import {
    GET_ERRORS,
    NETWORK_ERROR,
    POST_CREATING,
    POST_LOADER_DISPLAYED,
    POST_CREATED,
    POST_ERROR,
    RESET_ERRORS
} from '../types';
import axios from 'axios';
import isEmpty from '../../validation/isEmpty';

export const createPost = (newPost, history) => (dispatch, getState) => {
    dispatch({ type: POST_CREATING });
    axios
        .post('/posts/', newPost)
        .then(res => {
            dispatch({
                type: POST_CREATED,
                payload: res.data,
            });
            history.push('/dashboard');
        })
        .catch(err => {
            if (!isEmpty(err.response))
                dispatch({
                    type: POST_ERROR,
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

export const postLoaderDisplayed = () => (dispatch, getState) => {
    dispatch({ type: POST_LOADER_DISPLAYED });
};
