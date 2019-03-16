import {FETCH_ISSUES, 
    FETCH_TOP_VOTED_FEATURES, 
    CREATE_ISSUE,
    FETCH_ISSUE_DETAIL,
    CREATE_COMMENT,
    UPVOTE,
    CLOSE_ISSUE,
    REOPEN_ISSUE,
    FETCH_MY_ISSUES,
    FETCH_ISSUES_ASSIGNED_TO_ME,
    FETCH_BUGS,
    FETCH_FEATURES,
    FETCH_LANDING_DATA} from '../actions/types';

const initialState ={
    issues:[],
    issuesbyUser:[],
    issuesAssignedToUser:[],
    topVotedIssues:[],
    issue:{},
    createres:{},
    features:[],
    bugs:[],
    commentres:{},
    error:{},
    upvoteres:{},
    issueres:{},
    myissues:[],
    assignedtome:[],
    landingpagedata:{}
}

export default function(state = initialState,action){
    switch (action.type) {
        case FETCH_ISSUES:
            return{
                ...state,
                issues:action.payload
            }

        case FETCH_TOP_VOTED_FEATURES:
            return{
                ...state,
                topVotedIssues:action.payload
            }
        case FETCH_ISSUE_DETAIL:
            return{
                ...state,
                issue:action.payload
            }
        case CREATE_ISSUE:
            window.location.reload();
            return{
                ...state,
                createres:action.payload
            }
        case CREATE_COMMENT:
            window.location.reload();
            return{
                ...state,
                commentres:action.payload,
            }
        case UPVOTE:
            window.location.reload();
            return{
                ...state,
                upvoteres:action.payload
            }
        case CLOSE_ISSUE:
            window.location.reload();
            return{
                ...state,
                issueres:action.payload
            }
        case REOPEN_ISSUE:
            window.location.reload();
            return{
                ...state,
                issueres:action.payload
            }
        case FETCH_MY_ISSUES:
            return{
                ...state,
                myissues:action.payload
            }
        case FETCH_ISSUES_ASSIGNED_TO_ME:
            return{
                ...state,
                assignedtome:action.payload
            }
        case FETCH_BUGS:
            return{
                ...state,
                bugs:action.payload
            }
        case FETCH_FEATURES:
            return{
                ...state,
                features:action.payload
            }
        case FETCH_LANDING_DATA:
            return{
                ...state,
                landingpagedata:action.payload
            }
        default:
            return state;
    }
}