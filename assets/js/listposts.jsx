import React from "react";
import {connect} from "react-redux";
import {Table, Pagination} from "element-react";

import api from "./api";

function ListPosts(props){
    let current_page = props.current_page;
    api.get_total_page();
    api.get_posts_by_page(current_page);
    let columns = [
        {
            label: "Post by:",
            prop: "user",
        },
        {
            label: "Title:",
            prop: "title",
        },
    ];
    let data = props.posts;
    return(
        <Table
            columns={colums}
            data={data}
        />
    );
}


function state2props(state) {
    return {
        current_page: state.pagenum.current_page,
        total_page: state.pagenum.total_page,
        posts: state.posts,
    };
}

export default connect(state2props)(ListPosts)

