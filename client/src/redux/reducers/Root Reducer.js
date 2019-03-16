import { combineReducers } from 'redux';
import userReducers from './User Reducers';

export default  combineReducers({
    user: userReducers
});