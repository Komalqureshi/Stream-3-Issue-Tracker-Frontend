import { LOGIN, LOGIN_ERROR, LOGOUT, SIGNUP, SIGNUP_FAILED ,PAY} from "../actions/types";

const initialState = {
    authres:{},
    error:{},
    striperes:{}
}

export default function(state = initialState,action){
    switch (action.type) {
        case LOGIN:
            return{
                ...state,
                authres:action.payload
            }
        case LOGIN_ERROR:
            return{
                ...state,
                error:action.payload
            }
        case LOGOUT:
            localStorage.removeItem('ua_state');
            return{
                ...state,
                authres:action.payload
            }
        case SIGNUP:
            return{
                ...state,
                authres:action.payload
            }
        case SIGNUP_FAILED:
            return{
                ...state,
                error:action.paylod
            }
        case PAY:
            return{
                ...state,
                stripres:{}
            }
        default:
            return state
    }
}