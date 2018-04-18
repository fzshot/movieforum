import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import {NavLink, Link, Redirect} from "react-router-dom";
import {Button, Menu, Layout} from 'element-react';

import store from "./store";

function onSelect(e) {
    if (e == "4-1"){
        console.log("ok");
        store.dispatch({
            type: "REMOVE_TOKEN",
        });
        localStorage.clear();
        location.reload();
    }}

function Nav(props) {
    if (props.token) {
        console.log(props.token);
        let user_name = props.token.user_name;
        return (
            <Layout.Row className="extra-margin" type="flex" justify="center">
                <Layout.Col span="16" xs="24">
                    <Menu theme="light" mode="horizontal"  onSelect={(e) => onSelect(e)}>
                        <Menu.Item index="1">
                            <Link to="/">
                                Home
                            </Link>
                        </Menu.Item>
                        <Menu.Item index="2">
                            Movie Search
                        </Menu.Item>
                        <Menu.Item index="3">
                            Movie Forum
                        </Menu.Item>
                        <div className="login-align">
                            <Menu.SubMenu index="4" title={user_name}>
                                <Menu.Item index="4-1">
                                        Logout
                                </Menu.Item>
                            </Menu.SubMenu>
                        </div>
                    </Menu>
                </Layout.Col>
            </Layout.Row>
        );
    } else {
        return (
            <Layout.Row className="extra-margin" type="flex" justify="center">
                <Layout.Col span="16" xs="24">
                    <Menu theme="light" mode="horizontal" onSelect={(e) => onSelect(e)}>
                        <Menu.Item index="1">
                            <Link to="/">
                                Home
                            </Link>
                        </Menu.Item>
                        <Menu.Item index="2">
                            Movie Search
                        </Menu.Item>
                        <Menu.Item index="3">
                            Movie Forum
                        </Menu.Item>
                        <Menu.Item index="4">
                            <Link to="/login">
                                Login
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Layout.Col>
            </Layout.Row>
        );
    }
}


function state2props(state) {
    return {
        token: state.token,
        route: state.route,
    };
}

export default connect(state2props)(Nav)
