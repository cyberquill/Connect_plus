
import { GET_ERRORS } from './types';
import axios from 'axios';

export const createUser = newUser => dispatch => {
    axios
        .post('/api/users/signup', newUser)
        .then(res => console.log(res.data))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};