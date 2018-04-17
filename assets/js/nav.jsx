import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink, Link, Redirect} from "react-router-dom";
import {Button, Menu, Layout} from 'element-react';

import UserLogin from "./userlogin";

export default function Nav() {
  return (
    <Layout.Row type="flex" justify="center">
        <Layout.Col span="20" xs="24">
          <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal">
            <Menu.Item index="1">
              <NavLink to="/" exact={true} activeClassName="active">Home</NavLink>
            </Menu.Item>
            <Menu.Item index="2">
              <NavLink to="/">Movie Search</NavLink>
            </Menu.Item>
            <Menu.Item index="3">
              <NavLink to="/">Movie Forum</NavLink>
            </Menu.Item>
            <Menu.Item index="4">
            </Menu.Item>
            <UserLogin/>
          </Menu>
        </Layout.Col>
    </Layout.Row>
  );
}
