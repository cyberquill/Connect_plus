import { PERSON_RESET, PERSON_FETCHED } from '../types';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case PERSON_FETCHED:
            const user = action.payload;
            return {
                ...state,
                ...user,
            };

        case PERSON_RESET:
            return initialState;

        default:
            return state;
    }
}
