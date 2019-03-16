import { FETCH_DASHBOARD_DATA } from '../actions/types';

const initialState ={
    dashboard:{}
}

export default function(state = initialState,action){
    switch (action.type) {
        case FETCH_DASHBOARD_DATA:
            return{
                ...state,
                dashboard:action.payload
            }
        default:
            return state;
    }
}