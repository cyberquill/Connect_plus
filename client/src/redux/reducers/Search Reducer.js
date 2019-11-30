import { SEARCHING, SEARCHED, SEARCH_RESET, SEARCH_ERROR } from '../types';
import isEmpty from '../../validation/isEmpty';

const initialState = {
    showLoader: false,
    success: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCHING:
            return {
                ...state,
                showLoader: true,
                success: null,
            };

        case SEARCHED:
            const result = action.payload;
            return {
                ...state,
                ...result,
                success: true,
                showLoader: false,
            };

        case SEARCH_RESET:
            return initialState;

        case SEARCH_ERROR:
            return {
                ...state,
                success: false,
                showLoader: false,
            };

        default:
            return state;
    }
}
