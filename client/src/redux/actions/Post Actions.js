import axios from 'axios';
import isEmpty from '../../validation/isEmpty';
import {
    GET_ERRORS,
    NETWORK_ERROR,
    POST_CREATING,
    POST_CREATED,
    POST_ERROR,
    RESET_ERRORS,
    POSTS_FETCHED,
    POSTS_FETCHING,
    POST_SELECTED,
    POST_UNSELECTED,
    POST_DETAILS_FETCHING,
    POST_REACTIONS_FETCHED,
    POST_COMMENTS_FETCHED,
} from '../types';

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

export const getPosts = page => (dispatch, getState) => {
    dispatch({ type: POSTS_FETCHING });
    axios
        .get(`/users/feed/${page}`)
        .then(res =>
            dispatch({
                type: POSTS_FETCHED,
                payload: res.data,
            }),
        )
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

export const selectPost = (index, history) => (dispatch, getState) => {
    dispatch({ type: POST_SELECTED, payload: index });
};

export const unSelectPost = () => (dispatch, getState) => {
    dispatch({ type: POST_UNSELECTED });
};

export const getPostReactions = (pid, page) => (dispatch, getState) => {
    dispatch({ type: POST_DETAILS_FETCHING });
    axios
        .get(`/posts/${pid}/reactions/${page}`)
        .then(res =>
            dispatch({
                type: POST_REACTIONS_FETCHED,
                payload: res.data,
            }),
        )
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

export const getPostComments = (pid, page) => (dispatch, getState) => {
    dispatch({ type: POST_DETAILS_FETCHING });
    axios
        .get(`/posts/${pid}/comments/${page}`)
        .then(res =>
            dispatch({
                type: POST_COMMENTS_FETCHED,
                payload: res.data,
            }),
        )
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
