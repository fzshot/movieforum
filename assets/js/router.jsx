import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";

import api from "./api";
import Index from "./index";
import Login from "./login";
import Nav from "./nav";
import NewUser from "./new_user";

function PageRouter(props) {
    console.log(props);
    return (
        <Router>
            <div>
                <Nav/>
                <Route path="/" exact={true} render={() => {
                        let current = props.current_page;
                        api.get_total_page();
                        api.get_posts_by_page(current);
                        return <Index/>
                }}/>
                <Route path="/login" exact={true} render={() =>
                    <Login/>
                }/>
                <Route path="/newuser" exact={true} render={() =>
                    <NewUser/>
                }/>
            </div>
        </Router>
    );
}

function state2props(state) {
    return {
        current_page: state.pagenum.current_page,
    };
}

export default connect(state2props)(PageRouter)
