import { combineReducers } from 'redux'
import auth from './auth'
import editInfo from './editInfo';

export default combineReducers({
    auth,
    editInfo
})