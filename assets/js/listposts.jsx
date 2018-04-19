import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Table} from "element-react";

function ListPosts(props){
    let columns = [
        {
            label: "Title:",
            prop: "title",
            align: "center",
            render: (data) => {
                let path = "/post/"+data.id;
                return(
                    <Link to={path} target="_blank">
                        {data.title}
                    </Link>
                );
            }
        },
        {
            label: "Post by:",
            prop: "user_name",
            width: 250,
            align: "center",
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
    return {
        posts: state.posts,
    };
}

export default connect(state2props)(ListPosts)

