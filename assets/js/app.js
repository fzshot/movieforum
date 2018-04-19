// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
//import Nav from "./Nav";


import page_init from "./page_init";
import store from "./store";

import {i18n} from 'element-react';
import locale from './i18n/en';


function initial() {
    i18n.use(locale);

    let root = document.getElementById("root");
    if (root) {
        if (window.localStorage.getItem("token")) {
            let token = {
                token: window.localStorage.getItem("token"),
                user_name: window.localStorage.getItem("name"),
                user_id: window.localStorage.getItem("id"),
            };
            store.dispatch({
                type: "SET_TOKEN",
                token: token,
            });
        }
        page_init(store, root);
    }
}

$(initial);
