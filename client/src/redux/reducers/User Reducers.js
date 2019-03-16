import { CREATE_USER } from '../actions/types';

const initialState = {
    items: [],
    item: {}
};

export default function(state = initialState, action) {
    console.log('user reducer');
    switch(action.type) {
        case CREATE_USER:
            return {
                ...state,
                item: action.payload
            }

        default: return state;
    }
};