import {
    GET_ERRORS,
    NETWORK_ERROR,
    UPLOAD_ERROR,
    FILES_UPLOADING,
    FILES_UPLOADED,
    FILES_COLLECTED,
    RESET_ERRORS,
} from '../types';
import axios from 'axios';
import isEmpty from '../../validation/isEmpty';

export const uploadFiles = newFiles => (dispatch, getState) => {
    const data = new FormData();
    for (let i = 0; i < newFiles.length; i++) data.append('photos', newFiles[i]);

    dispatch({ type: FILES_UPLOADING, payload: newFiles.length });
    axios
        .post('/imageupload', data)
        .then(res =>
            dispatch({
                type: FILES_UPLOADED,
                payload: res.data,
            }),
        )
        .catch(err => {
            if (!isEmpty(err.response))
                dispatch({
                    type: UPLOAD_ERROR,
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
                dispatch({type: RESET_ERRORS});
            }, 5000);
        });
};

export const filesCollected = () => (dispatch, getState) => {
    dispatch({ type: FILES_COLLECTED });
};
