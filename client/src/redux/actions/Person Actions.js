import axios from 'axios';
import isEmpty from '../../validation/isEmpty';
import {
    PERSON_FETCHING,
    PERSON_FETCHED,
    PERSON_FOLLOWING,
    PERSON_FOLLOWED,
    PERSON_UNFOLLOWING,
    PERSON_UNFOLLOWED,
    FOLLOWERS_FETCHING,
    FOLLOWERS_FETCHED,
    FOLLOWING_FETCHING,
    FOLLOWING_FETCHED,
    FOLLOW_SETMODE,
    PERSON_ERROR,
    GET_ERRORS,
    NETWORK_ERROR,
    RESET_ERRORS,
    PERSON_RESET,
    FOLLOW_ERROR,
    FOLLOW_RESET,
} from '../types';

export const setPerson = (id, history) => (dispatch, getState) => {
    dispatch({ type: PERSON_FETCHING });
    axios
        .get(`/users/${id}`)
        .then(res => {
            dispatch({
                type: PERSON_FETCHED,
                payload: res.data,
            });
            history.push('/profile');
        })
        .catch(err => {
            if (!isEmpty(err.response))
                dispatch({
                    type: PERSON_ERROR,
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

export const resetPerson = () => (dispatch, getState) => {
    dispatch({ type: PERSON_RESET });
};

export const followPerson = id => (dispatch, getState) => {
    dispatch({ type: PERSON_FOLLOWING });
    axios
        .post(`/users/follow/${id}`)
        .then(res =>
            dispatch({
                type: PERSON_FOLLOWED,
                payload: res.data,
            }),
        )
        .catch(err => {
            if (!isEmpty(err.response))
                dispatch({
                    type: PERSON_ERROR,
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

export const unfollowPerson = id => (dispatch, getState) => {
    dispatch({ type: PERSON_UNFOLLOWING });
    axios
        .post(`/users/unfollow/${id}`)
        .then(res =>
            dispatch({
                type: PERSON_UNFOLLOWED,
                payload: res.data,
            }),
        )
        .catch(err => {
            if (!isEmpty(err.response))
                dispatch({
                    type: PERSON_ERROR,
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

export const getPersonFollowers = id => (dispatch, getState) => {
    dispatch({ type: FOLLOWERS_FETCHING });
    axios
        .get(`/users/${id}/followers/${getState().user.flwPgCtr}`)
        .then(res => 
            dispatch({
                type: FOLLOWERS_FETCHED,
                payload: res.data,
            }),
        )
        .catch(err => {
            if (!isEmpty(err.response))
                dispatch({
                    type: FOLLOW_ERROR,
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

export const getPersonFollowings = id => (dispatch, getState) => {
    dispatch({ type: FOLLOWING_FETCHING });
    axios
        .get(`/users/${id}/following/${getState().user.flwPgCtr}`)
        .then(res => 
            dispatch({
                type: FOLLOWING_FETCHED,
                payload: res.data,
            }),
        )
        .catch(err => {
            if (!isEmpty(err.response))
                dispatch({
                    type: FOLLOW_ERROR,
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

export const setFollowMode = mode => (dispatch, getState) => {
    dispatch({
        type: FOLLOW_SETMODE,
        payload: mode,
    });
};

export const resetFollow = () => (dispatch, getState) => {
    dispatch({ type: FOLLOW_RESET });
};