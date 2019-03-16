import { LOGIN,LOGIN_ERROR,LOGOUT, SIGNUP,SIGNUP_FAILED, PAY } from "./types";
import $ from 'jquery';
import { BASE_URL } from "../../settings";

export const login = (data) => dispatch => {
    $.ajax({
        url:BASE_URL+'common/login/',
        type:'POST',
        data:data,
        headers:{},
        success:function(response){
            dispatch({
                type:LOGIN,
                payload:response
            })
        },
        error:(response) =>{
            dispatch({
                type:LOGIN_ERROR,
                payload:response
            })
        }
    })
}

export const signup = (data) => dispatch =>{
    $.ajax({
        url:BASE_URL+'common/signup/',
        type:'POST',
        data:data,
        success:function(response){
            dispatch({
                type:SIGNUP,
                payload:response
            })
        },
        error:function(response){
            dispatch({
                type:SIGNUP_FAILED,
                payload:response
            })
        }
    })
}

export const logout = () => dispatch => {
    fetch(BASE_URL+'common/logout/')
    .then(res => res.json())
    .then(response => 
        dispatch({
            type:LOGOUT,
            payload:response
        })
    )
}


export const pay = (token) => dispatch =>{
    fetch(BASE_URL+'payments/stripe/')
    .then(res => res.json())
    .then(response =>
        dispatch({
            type:PAY,
            payload:response
        }))
}