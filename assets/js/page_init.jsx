import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import PageRouter from "./router.jsx";

export default function page_init(store, root) {
    ReactDOM.render(
        <Provider store={store}>
            <PageRouter/>
        </Provider>, root
    );
}
