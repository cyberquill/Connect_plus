import { POST_CREATING, POST_CREATED, POST_LOADER_DISPLAYED, POST_ERROR } from '../types';

const initialState = {
    showLoader: false,
    success: null,
    activePost: {},
    list: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case POST_CREATING:
            return {
                ...state,
                showLoader: true,
                success: null,
            };

        case POST_LOADER_DISPLAYED:
            return {
                ...state,
                showLoader: false,
            };

        case POST_CREATED:
            return {
                ...state,
                success: true,
            };

        case POST_ERROR:
            return {
                ...state,
                success: false,
                showLoader: false,
            };

        default:
            return state;
    }
}
