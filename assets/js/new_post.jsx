import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"

import ReactMarkdown from "react-markdown";
import {Layout, Button, Form, Input, Select} from "element-react";

function NewPost(props) {
    return <NewPostClass user_id={props.user_id} token={props.token}/>;
}

class NewPostClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            options: [],
            post_id: "",
            redirect: false,
            user_id: props.user_id,
            token: props.token,
            model: {
                title: "",
                content: "",
                movie: 0,
            },
            rule: {
                title: [
                    {required: true, message: "Title is required", trigger: "blur"}
                ],
                content: [
                    {required: true, message: "Content is required", trigger: "blur"}
                ],
                movie: [
                    {required: true, type: "number", message: "Please select the movie you want to disscus", tigger: "blur"},
                ],
            },
        };
    }

    onSearch(query) {
        if (query !== "") {
            this.setState({loading: true});

            let path = "https://api.themoviedb.org/3/search/movie?api_key=864fe4c5e0531ee91e15a17f6704b16a&language=en-US&query="+query+"&page=1&include_adult=false&region=US";

            $.ajax(path, {
                method: "get",
                success: (resp) => {
                    let options = _.map(resp.results, (m) => {
                        return {label: m.original_title, value: m.id};
                    });
                    this.setState({options: options});
                },
            });

            setTimeout(() => {
                this.setState({
                    loading: false,
                    options: _.filter(this.state.options, (item) => {
                        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    }),
                });
            }, 500);
        } else {
            this.setState({options: []});
        }
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
                let path = "/api/v1/posts";

                let text = {
                    post: {
                        tmdb_id: this.state.model.movie,
                        title: this.state.model.title,
                        content: this.state.model.content,
                        user_id: this.state.user_id,
                    }
                };

                $.ajax(path, {
                    method: "post",
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(text),
                    success: () => {
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
                                <Form.Item label="Movie" prop="movie">
                                    <Select filterable={true} remote={true}
                                            multiple={false}
                                            remoteMethod={this.onSearch.bind(this)}
                                            loading={this.state.loading}
                                            value={this.state.model.movie}
                                            onChange={this.onChange.bind(this, "movie")}
                                    >
                                        {
                                            _.map(this.state.options, (el) => {
                                                return <Select.Option
                                                    key={el.value}
                                                    label={el.label}
                                                    value={el.value}
                                                       />;
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Title" prop="title">
                                    <Input onChange={this.onChange.bind(this, "title")} />
                                </Form.Item>
                                <Form.Item label="Content (Support Markdown styling)" prop="content">
                                    <Input type="textarea" onChange={this.onChange.bind(this, "content")}/>
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
    console.log(state)
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

export default connect(state2props)(NewPost)
