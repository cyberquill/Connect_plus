import { combineReducers } from 'redux';
import authReducers from './Auth Reducers';
import uploadReducers from './Upload Reducers';
import postReducers from './Post Reducers';
import errorReducers from './Error Reducers';

export default combineReducers({
    user: authReducers,
    posts: postReducers,
    uploads: uploadReducers,
    errors: errorReducers,
});