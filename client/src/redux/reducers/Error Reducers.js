import {
    GET_ERRORS,
    AUTH_ERROR,
    NETWORK_ERROR,
    UPLOAD_ERROR,
    POST_ERROR,
    RESET_ERRORS,
    AUTH_UNSET_USER,
} from '../types';

const initialState = {
    user: {},
    posts: {},
    uploads: {},
    network: {},
    misc: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                ...state,
                misc: action.payload,
            };

        case AUTH_ERROR:
            return {
                ...state,
                ...action.payload,
            };
        case UPLOAD_ERROR:
            return {
                ...state,
                uploads: action.payload,
            };

        case POST_ERROR:
            return {
                ...state,
                posts: action.payload,
            };

        case NETWORK_ERROR:
            return {
                ...state,
                network: action.payload,
            };

        case RESET_ERRORS:
            return initialState;

        case AUTH_UNSET_USER:
            return initialState;

        default:
            return state;
    }
}
