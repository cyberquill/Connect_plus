import {
    POST_CREATING,
    POST_CREATED,
    POSTS_FETCHING,
    POSTS_FETCHED,
    POST_ERROR,
    POST_SELECTED,
    POST_UNSELECTED,
    POST_REACTION_SET,
    POST_DETAILS_FETCHING,
    POST_REACTIONS_FETCHED,
    POST_COMMENTS_FETCHED,
    POST_VIEWS_FETCHED,
    POST_VIEWS_RESET,
    POSTS_RESET,
    POST_REACTIONS_RESET,
    POST_COMMENTS_RESET,
    AUTH_UNSET_USER,
} from '../types';
import isEmpty from '../../validation/isEmpty';

const initialState = {
    showLoader: false,
    success: null,
    activePost: {},
    list: [],
    pstPgCtr: 1,
    viwPgCtr: 1,
    rxnPgCtr: 1,
    cmtPgCtr: 1,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case POST_CREATING:
        case POSTS_FETCHING:
        case POST_DETAILS_FETCHING:
            return {
                ...state,
                showLoader: true,
                success: null,
            };

        case POST_CREATED:
            return {
                ...state,
                success: true,
                showLoader: false,
            };

        case POSTS_RESET:
            return initialState;

        case POST_VIEWS_RESET:
            return {
                ...state,
                viwPgCtr: 1,
            };

        case POST_REACTIONS_RESET:
            return {
                ...state,
                rxnPgCtr: 1,
            };

        case POST_COMMENTS_RESET:
            return {
                ...state,
                cmtPgCtr: 1,
            };

        case POSTS_FETCHED:
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

        case POST_SELECTED:
            return {
                ...state,
                activePost: { ...action.payload },
            };

        case POST_UNSELECTED:
            return {
                ...state,
                activePost: {},
            };

        case POST_REACTION_SET:
            return {
                ...state,
                activePost: {
                    ...state.activePost,
                    reaction: action.payload,
                },
            };

        case POST_VIEWS_FETCHED:
            if (!isEmpty(action.payload))
                return {
                    ...state,
                    success: true,
                    showLoader: false,
                    viwPgCtr: state.viwPgCtr + 1,
                    activePost: {
                        ...state.activePost,
                        viwList: action.payload,
                    },
                };
            else
                return {
                    ...state,
                    showLoader: false,
                    success: false,
                };

        case POST_REACTIONS_FETCHED:
            if (!isEmpty(action.payload)) {
                console.log('changing state');
                return {
                    ...state,
                    success: true,
                    showLoader: false,
                    rxnPgCtr: state.rxnPgCtr + 1,
                    activePost: {
                        ...state.activePost,
                        rxnList: [...action.payload],
                    },
                };
            } else
                return {
                    ...state,
                    showLoader: false,
                    success: false,
                };

        case POST_COMMENTS_FETCHED:
            if (!isEmpty(action.payload))
                return {
                    ...state,
                    success: true,
                    showLoader: false,
                    cmtPgCtr: state.cmtPgCtr + 1,
                    activePost: {
                        ...state.activePost,
                        cmtList: action.payload,
                    },
                };
            else
                return {
                    ...state,
                    showLoader: false,
                    success: false,
                };

        case POST_ERROR:
            return {
                ...state,
                success: false,
                showLoader: false,
            };

        case AUTH_UNSET_USER:
            return initialState;

        default:
            return state;
    }
}
