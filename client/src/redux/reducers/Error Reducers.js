import { GET_ERRORS, NETWORK_ERROR } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;

        case NETWORK_ERROR:
            return action.payload;

        default:
            return state;
    }
}
