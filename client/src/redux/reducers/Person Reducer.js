import {
    PERSON_FETCHING,
    PERSON_FETCHED,
    PERSON_RESET,
    PERSON_ERROR,
    PERSON_FOLLOWING,
    PERSON_FOLLOWED,
    PERSON_UNFOLLOWED,
    PERSON_UNFOLLOWING,
} from '../types';
import isEmpty from '../../validation/isEmpty';

const initialState = {
    showLoader: false,
    success: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case PERSON_FETCHING:
        case PERSON_FOLLOWING:
        case PERSON_UNFOLLOWING:
            return {
                ...state,
                showLoader: true,
                success: null,
            };

        case PERSON_FETCHED:
            const user = action.payload;
            return {
                ...state,
                ...user,
                success: true,
                showLoader: false,
            };

        case PERSON_FOLLOWED:
            return {
                ...state,
                success: true,
                showLoader: false,
            };

        case PERSON_UNFOLLOWED:
            return {
                ...state,
                success: true,
                showLoader: false,
            };

        case PERSON_RESET:
            return initialState;

        case PERSON_ERROR:
            return {
                ...state,
                success: false,
                showLoader: false,
            };

        default:
            return state;
    }
}
