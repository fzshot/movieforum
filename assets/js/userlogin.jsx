import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {Button, Menu} from 'element-react';

import store from "./store";

function UserLogin(props){
    if (props.token) {
        console.log(props.token);
        let user_name = props.token.user_name;
        return (
            <Menu.SubMenu index="5"
                title={user_name}
            >
                <Menu.Item index="5-1">
                    Logout
                </Menu.Item>
            </Menu.SubMenu>
        );
    } else {
        return (
            <Menu.Item index="5">
                <NavLink to="/login" exact={true}
                    activeClassName="is-active"
                >
                    Login
                </NavLink>
            </Menu.Item>
        );
    }
}

function Logout(){
    store.dispatch({
        type: "REMOVE_TOKEN",
    });
    localStorage.removeItem("token");
}

function state2props(state) {
    return {
        token: state.token,
    };
}

export default connect(state2props)(UserLogin)
