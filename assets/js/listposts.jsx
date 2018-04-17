import React from "react";
import {connect} from "react-redux";
import {Table} from "element-react";

function ListPosts(props){
    let columns = [
        {
            label: "Post by:",
            prop: "user_name",
        },
        {
            label: "Title:",
            prop: "title",
        },
    ];
    let data = _.map(props.posts, (post) => {
        let name = post.user.name;
        let temp = {user_name: name};
        let newPost = Object.assign({}, post, temp);
        return newPost;
    });
    return (
        <Table columns={columns} data={data}/>
    );
}



function state2props(state) {
    console.log(state.pagenum);
    return {
        posts: state.posts,
    };
}

export default connect(state2props)(ListPosts)

