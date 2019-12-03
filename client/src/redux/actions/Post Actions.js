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
    POST_REACTION_SET,
    POST_DETAILS_FETCHING,
    POST_VIEWS_FETCHED,
    POST_REACTIONS_FETCHED,
    POST_COMMENTS_FETCHED,
    POSTS_RESET,
    POST_VIEWS_RESET,
    POST_REACTIONS_RESET,
    POST_COMMENTS_RESET,
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

export const getFeedPosts = () => (dispatch, getState) => {
    dispatch({ type: POSTS_FETCHING });
    axios
        .get(`/users/feed/${getState().posts.pstPgCtr}`)
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

export const getPosts = id => (dispatch, getState) => {
    dispatch({ type: POSTS_FETCHING });
    axios
        .get(`/users/${id}/posts/${getState().posts.pstPgCtr}`)
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

export const selectPost = post => (dispatch, getState) => {
    dispatch({ type: POST_SELECTED, payload: post });
};

export const unSelectPost = () => (dispatch, getState) => {
    dispatch({ type: POST_UNSELECTED });
};

export const setPostReaction = (pid, reaction) => (dispatch, getState) => {
    axios
        .post(`/posts/${pid}/reaction`, { type: reaction })
        .then(res => {
            dispatch({
                type: POST_REACTION_SET,
                payload: reaction,
            });
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

export const setPostComment = (pid, comment) => (dispatch, getState) => {
    axios
        .post(`/posts/${pid}/comment`, comment)
        .then(res => {})
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

export const getPostViews = (pid, page) => (dispatch, getState) => {
    dispatch({ type: POST_DETAILS_FETCHING });
    axios
        .get(`/posts/${pid}/views/${page}`)
        .then(res =>
            dispatch({
                type: POST_VIEWS_FETCHED,
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

export const postsReset = () => (dispatch, getState) => {
    dispatch({ type: POSTS_RESET });
};

export const postViewsReset = () => (dispatch, getState) => {
    dispatch({ type: POST_VIEWS_RESET });
};

export const postReactionsReset = () => (dispatch, getState) => {
    dispatch({ type: POST_REACTIONS_RESET });
};

export const postCommentsReset = () => (dispatch, getState) => {
    dispatch({ type: POST_COMMENTS_RESET });
};
