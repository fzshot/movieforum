import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {Layout, Card, Button} from "element-react";
import ReactMarkdown from "react-markdown";
import Disqus from "disqus-react";

function ShowPost(props) {
    return <ShowPostClass id={props.id} current_id={props.current_id}/>;
}

function EditButton(props) {
    let creator = props.user_id;
    let current = props.current;
    if (creator == current) {
        let path = "/edit/"+props.post_id;
        return(
            <Link to={path}>
                <Button type="text">
                    Edit
                </Button>
            </Link>
        );
    } else {
        return null;
    }
}


class ShowPostClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: "",
            title: "",
            content: "",
            tmdb_img: "",
            tmdb_overview: "",
            user_id: "",
            current_id: props.current_id,
        };

        this.getPost(props.id);
    }


    getPost(id) {
        let path = "/api/v1/posts/"+id;

        $.ajax(path, {
            method: "get",
            success: (resp) => {
                let data = resp.data;
                let tmdb = JSON.parse(data.tmdb.detail_json);
                let img = "https://image.tmdb.org/t/p/w400"+tmdb.backdrop_path;
                let newState = {
                    name: data.user.name,
                    title: data.title,
                    content: data.content,
                    tmdb_img: img,
                    tmdb_overview: tmdb.overview,
                    user_id: data.user.id,
                };
                this.setState(newState)
            },
            error: () => {},
        });
    }

    render() {
        const disqusShortname = 'movieforum';
        const disqusConfig = {
            url: "https://movie.czeng.me/post/"+this.state.id,
            identifier: this.state.id,
            title: this.state.title,
        };
        return(
            <div>
                <Layout.Row type="flex" justify="center" align="top">
                    <Layout.Col span="12" xs="22">
                        <Card header={
                            <div>
                                <div style={{textAlign: "right"}}>
                                    <EditButton user_id={this.state.user_id}
                                                        current={this.state.current_id}
                                                        post_id={this.state.id}
                                    />
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <h3>
                                        {this.state.title}
                                    </h3>
                                </div>
                            </div>
                        }>
                            <Layout.Row type="flex" justify="center" align="top">
                                <Layout.Col span="12" xs="22" lg="10">
                                    <Card bodyStyle={{padding: "0"}}>
                                            <img width="100%" height="100%" src={this.state.tmdb_img}/>
                                            <div style={{padding: "14"}}>
                                                <span style={{textAlign: "justify"}}>
                                                    {this.state.tmdb_overview}
                                                </span>
                                            </div>
                                    </Card>
                                </Layout.Col>
                            </Layout.Row>
                            <ReactMarkdown source={this.state.content}
                                        escapeHtml={false}
                                        className="markdown-body"
                            />
                        </Card>
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row type="flex" justify="center" align="top">
                    <Layout.Col span="12" xs="22">
                        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig}/>
                    </Layout.Col>
                </Layout.Row>
            </div>
        );
    }
}

function state2props(state) {
    if (state.token){
        return {
            current_id: state.token.user_id,
        };
    } else {
        return {
            current_id: null,
        }
    }
}

export default connect(state2props)(ShowPost)
