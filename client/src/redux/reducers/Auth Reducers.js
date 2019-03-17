import { CREATE_USER } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        
        default:
            return state;
    }
}
