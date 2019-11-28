import {
    PERSON_RESET,
    PERSON_FETCHING,
    PERSON_FETCHED,
    PERSON_POSTS_FETCHING,
    PERSON_POSTS_FETCHED,
    PERSON_POST_SELECTED,
    PERSON_POST_UNSELECTED,
} from '../types';
import isEmpty from '../../validation/isEmpty';

const initialState = {
    showLoader: false,
    success: null,
    activePost: {},
    list: [],
    pstPgCtr: 1,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case PERSON_FETCHING:
        case PERSON_POSTS_FETCHING:
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

        case PERSON_POSTS_FETCHED:
            if (!isEmpty(action.payload))
                return {
                    ...state,
                    success: true,
                    showLoader: false,
                    pstPgCtr: state.pstPgCtr + 1,
                    list: [...state.list, ...action.payload],
                };
            else
                return {
                    ...state,
                    showLoader: false,
                    success: true,
                };

        case PERSON_POST_SELECTED:
            return {
                ...state,
                activePost: state.list[action.payload],
            };

        case PERSON_POST_UNSELECTED:
            return {
                ...state,
                activePost: {},
            };

        case PERSON_RESET:
            return initialState;

        default:
            return state;
    }
}
