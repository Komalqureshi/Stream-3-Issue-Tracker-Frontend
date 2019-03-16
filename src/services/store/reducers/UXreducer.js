import {OPEN_LOGIN, CLOSE_LOGIN, OPEN_SIGNUP, CLOSE_SIGNUP} from '../actions/types';

const initialState = {
}

export default function(state = initialState,action){
    switch (action.type) {
        case OPEN_LOGIN:
            return{
                ...state,
                loginIsOpen:action.isOpen
            }
        case CLOSE_LOGIN:
            return{
                ...state,
                loginIsOpen:action.isOpen
            }
        case OPEN_SIGNUP:
            return{
                ...state,
                signUpOpen:action.isOpen
            }
        case CLOSE_SIGNUP:
            return{
                ...state,
                signUpOpen:action.isOpen
            }
        default:
            return state;
    }
}