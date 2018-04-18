import {createStore, combineReducers} from "redux";
import deepFreeze from "deep-freeze";

function users(state = [], action) {
    switch(action.type) {
        case "GET_USER":
            return action.users;
        default:
            return state;
    }
}

function token(state = null, action) {
    switch(action.type) {
        case "SET_TOKEN":
            return action.token;
        case "REMOVE_TOKEN":
            return null;
        default:
            return state;
    }
}

let default_dup = {
    boolean: false,
    text: "",
};

function newuser_dup(state = default_dup, action) {
    switch(action.type) {
        case "DUP_EMAIL":
            return action.newuser_dup;
        case "REMOVE_DUP":
            return default_dup;
        default:
            return state;
    }
}

function redirect(state = false, action) {
    switch(action.type) {
        case "REDIRECT":
            return true;
        case "NOREDIRECT":
            return false;
        default:
            return state;
    }
}

function login(state = false, action) {
    switch(action.type) {
        case "LOGIN_ERROR":
            return true;
        case "LOGIN_OK":
            return false;
        default:
            return state;
    }
}



let default_page_num = {
    total_page: 1,
    current_page: 1,
};

function pagenum(state = default_page_num, action) {
    switch(action.type) {
        case "SET_TOTAL_PAGE":
            return Object.assign({}, state, action.data);
        case "SET_CURRENT_PAGE":
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

function posts(state = [], action) {
    switch(action.type) {
        case "GET_POSTS":
            return action.data;
        default:
            return state;
    }
}

function route(state = 1, action) {
    switch(action.type) {
        case "SET_ROUTE":
            return action.data;
        default:
            return state;
    }
}


function root_reducer(state0, action) {
    let reducer = combineReducers({token, users, redirect, login, newuser_dup, pagenum, posts, route});
    let state1 = reducer(state0, action);
    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
