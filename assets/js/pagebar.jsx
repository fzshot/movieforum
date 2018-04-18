import React from "react";
import {connect} from "react-redux";
import {Pagination} from "element-react";

import api from "./api";
import store from "./store";

function PageBar(props) {
    let total = props.total_page;
    let current = props.current_page;
    return (
        <Pagination layout="prev, pager, next"
                    pageSize={20}
                    total={total}
                    currentPage={current}
                    onCurrentChange={(e) => {
                            let temp = {current_page: e};
                            store.dispatch({
                                type: "SET_CURRENT_PAGE",
                                data: temp,
                            });
                            api.get_total_page();
                            api.get_posts_by_page(e);
                    }}
        />
    );
}

function state2props(state) {
    return {
        current_page: state.pagenum.current_page,
        total_page: state.pagenum.total_page,
    };
}

export default connect(state2props)(PageBar)
