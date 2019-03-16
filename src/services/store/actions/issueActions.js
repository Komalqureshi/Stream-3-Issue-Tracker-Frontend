import $ from 'jquery';
import { FETCH_ISSUES, CREATE_ISSUE, CREATE_ISSUE_FAILED, FETCH_ISSUES_ASSIGNED_TO_USER, FETCH_ISSUES_CREATED_BY_USER, FETCH_TOP_VOTED_FEATURES, FETCH_FEATURES, FETCH_FEATURES_FAILED, FETCH_BUGS, FETCH_BUGS_FAILED, FETCH_ISSUE_DETAIL, CREATE_COMMENT, UPVOTE, CLOSE_ISSUE, REOPEN_ISSUE, FETCH_MY_ISSUES, FETCH_ISSUES_ASSIGNED_TO_ME, FETCH_LANDING_DATA } from './types';
import {BASE_URL} from '../../settings';

export const createIssue = (data,token) => dispatch =>{
    $.ajax({
        url:BASE_URL+'issues/create/',
        type:"POST",
        data:data,
        headers:{
            "Authorization":"token "+token
        },
        success:function(response){
            dispatch({
                type:CREATE_ISSUE,
                payload:response
            })
        },
        error:function(error){
            dispatch({
                type:CREATE_ISSUE_FAILED,
                payload:error
            })
        }
    })
}


export const fetchIssues = (token) => dispatch =>{
    $.ajax({
        url:BASE_URL+'issues/list/',
        type:'GET',
        headers:{
            "Authorization":"token "+token
        },
        success:function(response){
            dispatch({
                type:FETCH_ISSUES,
                payload:response
            })
        },
        error:function(error){
            dispatch({
                type:FETCH_FEATURES_FAILED,
                payload:error
            })
        }
    })
}


export const submitComment = (token,data) => dispatch =>{
    $.ajax({
        url:BASE_URL+'issues/postcomment/',
        type:'POST',
        headers:{
            "Authorization":"token "+token
        },
        data:data,
        success:function(response){
            dispatch({
                type:CREATE_COMMENT,
                payload:response
            })
        }
    })
}

export const upvote = (token,data) => dispatch =>{
    $.ajax({
        url:BASE_URL+'issues/upvote/',
        type:'POST',
        headers:{
            "Authorization":"token "+token
        },
        data:data,
        success:function(response){
            dispatch({
                type:UPVOTE,
                payload:response
            })
        }
    })
}

export const fetchIssueDetail = (token,issue) => dispatch => {
    $.ajax({
        url:BASE_URL+'issues/issuedetail/',
        type:'POST',
        data:issue,
        headers:{
            "Authorization":"token "+token
        },
        success:function(response){
            dispatch({
                type:FETCH_ISSUE_DETAIL,
                payload:response
            })
        }
    })
}

export const closeissue = (token,issue) => dispatch =>{
    $.ajax({
        url:BASE_URL+'issues/closeissue/',
        type:"POST",
        data:issue,
        headers:{
            "Authorization":"token "+token
        },
        success:function(response){
            dispatch({
                type:CLOSE_ISSUE,
                payload:response
            })
        }
    })
}

export const reopenissue = (token,issue) => dispatch =>{
    $.ajax({
        url:BASE_URL+'issues/reopenissue/',
        type:'POST',
        data:issue,
        headers:{
            "Authorization":"token "+token
        },
        success:function(response){
            dispatch({
                type:REOPEN_ISSUE,
                payload:response
            })
        }
    })
}

export const fetchmyissues = (token,data) => dispatch =>{
    $.ajax({
        url:BASE_URL+'issues/myissues/',
        type:'POST',
        data:data,
        headers:{
            "Authorization":"token "+token
        },
        success:function(response){
            dispatch({
                type:FETCH_MY_ISSUES,
                payload:response
            })
        }
    })
}

export const fetchissuesassignedtome = (token,data) => dispatch =>{
    $.ajax({
        url:BASE_URL+'issues/assignedtome/',
        type:'POST',
        data:data,
        headers:{
            "Authorization":"token "+token
        },
        success:function(response){
            dispatch({
                type:FETCH_ISSUES_ASSIGNED_TO_ME,
                payload:response
            })
        }
    })
}

export const fetchBugs = (token) => dispatch =>{
    $.ajax({
        url:BASE_URL+'issues/bugs/',
        type:'GET',
        headers:{
            "Authorization":"token "+token
        },
        success:function(response){
            dispatch({
                type:FETCH_BUGS,
                payload:response
            })
        }
    })
}

export const fetchFeatures = (token) => dispatch =>{
    $.ajax({
        url:BASE_URL+'issues/features/',
        type:'GET',
        headers:{
            "Authorization":"token "+token
        },
        success:function(response){
            dispatch({
                type:FETCH_FEATURES,
                payload:response
            })
        }
    })
}

export const fetchLandingData = () => dispatch =>{
    $.ajax({
        url:BASE_URL+'common/landingpage/',
        type:'GET',
        success:function(response){
            dispatch({
                type:FETCH_LANDING_DATA,
                payload:response
            })
        }
    })
}