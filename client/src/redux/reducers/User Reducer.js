import { AUTH_SET_USER, AUTH_UNSET_USER } from '../types';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case AUTH_SET_USER:
            const user = action.payload;
            return {
                ...state,
                ...user,
                loginTime: Date.now(),
            };

        case AUTH_UNSET_USER:
            return initialState;

        default:
            return state;
    }
}
