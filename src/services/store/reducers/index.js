import {combineReducers} from 'redux';
import userReducer from './userReducer';
import UXreducer from './UXreducer';
import issueReducer from './issueReducer';
import dashboardReducer from './dashboardReducer';

export default combineReducers({
    user:userReducer,
    UX:UXreducer,
    issues:issueReducer,
    dashboard:dashboardReducer
});