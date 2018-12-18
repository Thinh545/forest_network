import { combineReducers } from 'redux'
import auth from './auth'
import editInfo from './editInfo';
import follower from './follower';
import following from './following';

export default combineReducers({
    auth,
    editInfo,
    follower,
    following
});