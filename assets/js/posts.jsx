import React from "react";
import {connect} from "react-redux";
import {Table, Pagination} from "element-react";

export default function ListPosts(){
}


class ListPostsClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        };
    }

    getPosts(porps) {
    }

}

function PageBar(props) {
    let total_page = props.total_page;
    let current_page = props.current_page;
    return (
        <Pagination layout="sizes prev, pager, next"
                    total={total_page}
                    onCurrentChange={() => {
                    }}
        />
    );
}

function state2props(state) {
    return {
        total_page: state.pagenum.total_page,
        current_page: state.pagenum.current_page,
    }
}

export default connect(state2props)(ListsPosts)

