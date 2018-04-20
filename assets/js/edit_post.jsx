import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"

import ReactMarkdown from "react-markdown";
import {Layout, Button, Form, Input, Select, Message} from "element-react";

function EditPost(props) {
    return <NewPostClass id={props.id} user_id={props.user_id} token={props.token}/>;
}

class NewPostClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            loading: false,
            options: [],
            post_id: "",
            redirect: false,
            user_id: props.user_id,
            token: props.token,
            model: {
                title: "",
                content: "",
            },
            rule: {
                title: [
                    {required: true, message: "Title is required", trigger: "blur"}
                ],
                content: [
                    {required: true, message: "Content is required", trigger: "blur"}
                ],
            },
        };

        this.getPost(this.state.id);
    }

    getPost(id) {
        let path = "/api/v1/posts/"+id;

        $.ajax(path, {
            method: "get",
            success: (resp) => {
                console.log(resp);
                let data = resp.data;
                let tmdb = JSON.parse(data.tmdb.detail_json);
                let newState = {
                    title: data.title,
                    content: data.content,
                };
                this.setState({model: newState});
            },
            error: () => {},
        });
    }

    onChange(key, value) {
        this.setState({
            model: Object.assign({}, this.state.model, {[key]: value})
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.refs.form.validate((valid) => {
            if (valid) {
                let path = "/api/v1/posts/"+this.state.id;

                let text = {
                    post: {
                        tmdb_id: this.state.model.movie,
                        title: this.state.model.title,
                        content: this.state.model.content,
                        user_id: this.state.user_id,
                    }
                };

                $.ajax(path, {
                    type: "patch",
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(text),
                    success: () => {
                        Message({
                            type: "success",
                            message: "Post Created",
                        });
                        this.setState({redirect: true});
                    },
                });
            }
        });
    }

    render() {
        if (this.state.user_id) {
            if (this.state.redirect) {
                return <Redirect to="/"/>;
            } else {
                return (
                    <Layout.Row gutter="20" type="flex" justify="center" align="top">
                        <Layout.Col span="8" xs="22">
                            <Form ref="form" model={this.state.model} rules={this.state.rule}
                                onSubmit={this.onSubmit.bind(this)}>
                                <Form.Item label="Title" prop="title">
                                    <Input value={this.state.model.title} onChange={this.onChange.bind(this, "title")} />
                                </Form.Item>
                                <Form.Item label="Content (Support Markdown Styling)" prop="content">
                                    <Input type="textarea" autosize={true} value={this.state.model.content} onChange={this.onChange.bind(this, "content")}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button nativeType="submit" type="primary">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Layout.Col>
                        <Layout.Col span="8" xs="22">
                            <ReactMarkdown source={this.state.model.content}
                                           escapeHtml={false}
                                           className="markdown-body"
                            />
                        </Layout.Col>
                    </Layout.Row>
                );
            }
        } else {
            return <Redirect to="/login"/>;
        }
    }


}

function state2props(state) {
    if (state.token) {
        return {
            user_id: state.token.user_id,
            token: state.token.token,
        };
    } else {
        return {
            user_id: null,
            token: null,
        };
    }
}

export default connect(state2props)(EditPost)
