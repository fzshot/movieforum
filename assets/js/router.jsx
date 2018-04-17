import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Index from "./index";
import Login from "./login";
import Nav from "./nav";

export default function PageRouter(root) {
    return (
        <Router>
            <div>
                <Nav style={{margin: "20px"}}/>
                <Route path="/" exact={true} render={() =>
                    <Index/>
                }/>
                <Route path="/login" exact={true} render={() =>
                    <Login/>
                }/>
            </div>
        </Router>
    );
}
