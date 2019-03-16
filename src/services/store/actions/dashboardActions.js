import $ from 'jquery';
import { BASE_URL } from '../../settings';
import { FETCH_DASHBOARD_DATA } from './types';

export const fetchDashboard = (token) => dispatch =>{
    $.ajax({
        url:BASE_URL+'common/dashboard/',
        type:'GET',
        headers:{
            "Authorization":"token "+token
        },
        success:function(response){
            dispatch({
                type:FETCH_DASHBOARD_DATA,
                payload:response
            })
        }
    })
}