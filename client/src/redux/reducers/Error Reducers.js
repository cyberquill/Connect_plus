import { GET_ERRORS, NETWORK_ERROR, UPLOAD_ERROR, POST_ERROR, RESET_ERRORS } from '../types';

const initialState = {
    posts: null,
    uploads: null,
    user: null,
    network: null,
    misc: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                ...state,
                misc: action.payload,
            }

        case UPLOAD_ERROR:
            return {
                ...state,
                uploads: action.payload,
            }

        case POST_ERROR:
            return {
                ...state,
                posts: action.payload,
            }

        case NETWORK_ERROR:
            return {
                ...state,
                network: action.payload,
            }

        case RESET_ERRORS:
            return initialState;

        default:
            return state;
    }
}
