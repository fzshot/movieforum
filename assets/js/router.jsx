import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";

import api from "./api";
import Index from "./index";
import Login from "./login";
import Nav from "./nav";

export default function PageRouter(root) {
    return (
        <Router>
            <div>
                <Nav style={{margin: "20px"}}/>
                <Route path="/" exact={true} render={() => {
                    api.get_total_page();
                    api.get_posts_by_page(1);
                    return <Index/>
                }}/>
                <Route path="/login" exact={true} render={() =>
                    <Login/>
                }/>
            </div>
        </Router>
    );
}
