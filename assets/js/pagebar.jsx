import React from "react";
import {connect} from "react-redux";
import {Pagination} from "element-react";

import api from "./api";

function PageBar(props) {
    let total = props.total_page;
    console.log(total);
    return (
        <Pagination layout="prev, pager, next"
            pageSize={20}
            total={total}
            onCurrentChange={(e) => {
                api.get_total_page();
                api.get_posts_by_page(e);
            }}
        />
    );
}

function state2props(state) {
    return {
        total_page: state.pagenum.total_page,
    };
}

export default connect(state2props)(PageBar)
