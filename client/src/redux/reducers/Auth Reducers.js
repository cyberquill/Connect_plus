
import { AUTH_SET_USER } from '../types';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case AUTH_SET_USER:
            const user = action.payload;
            return {
                ...state,
                ...user
            }

        default:
            return state;
    }
}
