import { combineReducers } from 'redux';
import userReducer from './User Reducer';
import uploadReducer from './Upload Reducer';
import postReducer from './Post Reducer';
import errorReducer from './Error Reducer';
import personReducer from './Person Reducer';
import searchReducer from './Search Reducer';

export default combineReducers({
    user: userReducer,
    posts: postReducer,
    uploads: uploadReducer,
    errors: errorReducer,
    person: personReducer,
    search: searchReducer,
});