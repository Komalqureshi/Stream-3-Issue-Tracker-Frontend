import { OPEN_LOGIN, CLOSE_LOGIN, OPEN_SIGNUP, CLOSE_SIGNUP } from "./types";

export const openLogin = () => dispatch =>{
    dispatch({
        type:OPEN_LOGIN,
        isOpen:true
    })
}

export const closeLogin = () => dispatch =>{
    dispatch({
        type:CLOSE_LOGIN,
        isOpen:false
    })
}

export const openSignup = () => dispatch =>{
    dispatch({
        type:OPEN_SIGNUP,
        isOpen:true
    })
}

export const closeSignup = () => dispatch => {
    dispatch({
        type:CLOSE_SIGNUP,
        isOpen:false
    })
}