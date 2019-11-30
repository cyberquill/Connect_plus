import {
    PERSON_FETCHING,
    PERSON_FETCHED,
    PERSON_RESET,
    PERSON_ERROR,
    PERSON_FOLLOWING,
    PERSON_FOLLOWED,
    PERSON_UNFOLLOWED,
    PERSON_UNFOLLOWING,
    FOLLOWERS_FETCHED,
    FOLLOWERS_FETCHING,
    FOLLOWING_FETCHED,
    FOLLOWING_FETCHING,
    FOLLOW_SETMODE,
    FOLLOW_ERROR,
    FOLLOW_RESET,
} from '../types';
import isEmpty from '../../validation/isEmpty';

const initialState = {
    showLoader: false,
    success: null,
    mode: null,
    follows: [],
    flwPgCtr: 1,
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

        case FOLLOW_SETMODE:
            return {
                ...state,
                mode: action.payload,
            };

        case FOLLOWERS_FETCHING:
        case FOLLOWING_FETCHING:
            return {
                ...state,
                showLoader: true,
                success: null,
            };

        case FOLLOWERS_FETCHED:
            if (!isEmpty(action.payload))
                return {
                    ...state,
                    success: true,
                    showLoader: false,
                    flwPgCtr: state.flwPgCtr + 1,
                    follows: [...state.follows, ...action.payload],
                };
            else
                return {
                    ...state,
                    showLoader: false,
                    success: true,
                };

        case FOLLOWING_FETCHED:
            if (!isEmpty(action.payload))
                return {
                    ...state,
                    success: true,
                    showLoader: false,
                    flwPgCtr: state.flwPgCtr + 1,
                    follows: [...state.follows, ...action.payload],
                };
            else
                return {
                    ...state,
                    showLoader: false,
                    success: true,
                };

        case FOLLOW_RESET:
            return {
                ...state,
                showLoader: false,
                success: null,
                mode: null,
                follows: [],
                flwPgCtr: 1,
            };

        case PERSON_RESET:
            return initialState;

        case FOLLOW_ERROR:
            return {
                ...state,
                success: false,
                showLoader: false,
            };

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
