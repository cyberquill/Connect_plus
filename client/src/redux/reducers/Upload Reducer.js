import {
    FILES_UPLOADING,
    FILES_UPLOADED,
    FILES_COLLECTED,
    UPLOAD_ERROR,
    AUTH_UNSET_USER,
} from '../types';

const initialState = {
    isLoading: false,
    success: null,
    nUploads: 0,
    urls: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FILES_UPLOADING:
            return {
                ...state,
                isLoading: true,
                success: null,
                nUploads: action.payload,
                urls: [],
            };

        case FILES_UPLOADED:
            return {
                ...state,
                isLoading: false,
                success: true,
                urls: action.payload,
            };

        case FILES_COLLECTED:
            return initialState;

        case UPLOAD_ERROR:
            return {
                ...state,
                success: false,
                isLoading: false,
                nUploads: 0,
                urls: [],
            };

        case AUTH_UNSET_USER:
            return initialState;

        default:
            return state;
    }
}
