import React from "react";

import {Layout, Card} from "element-react";
import ReactMarkdown from "react-markdown";

export default function ShowPost(props) {
    return <ShowPostClass id={props.id}/>;
}


class ShowPostClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            title: "",
            content: "",
            /* tmdb_img: "",
             * tmdb_id: "",*/
        };

        this.getPost(props.id);
    }


    getPost(id) {
        let path = "/api/v1/posts/"+id;

        $.ajax(path, {
            method: "get",
            success: (resp) => {
                let data = resp.data;
                /* let tmdb = JSON.parse(data.tmdb.detail);*/
                let newState = {
                    name: data.user.name,
                    title: data.title,
                    content: data.content,
                    /* tmdb_id: tmdb.tmdb_id,
                     * tmdb_img: tmdb.poster_path,*/
                };
                this.setState(newState)
            },
            error: () => {},
        });
    }

    render() {
        return(
            <Layout.Row type="flex" justify="center" align="top">
                <Layout.Col span="12" xs="22">
                    <Card header={
                        <div style={{textAlign: "center"}}>
                            <h3>
                                {this.state.title}
                            </h3>
                        </div>
                    }>
                        <ReactMarkdown source={this.state.content}
                                    escapeHtml={false}
                                    className="markdown-body"
                        />
                    </Card>
                </Layout.Col>
            </Layout.Row>
        );
    }
}
