
import { AUTH_USER_NATIVE } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case AUTH_USER_NATIVE:
            const user = action.payload;
            return {
                ...state,
                ...user
            }

        default:
            return state;
    }
}
