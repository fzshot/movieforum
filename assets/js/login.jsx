import React from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {Layout, Button, Form, Input, Alert, Message} from "element-react";

import api from "./api";
import store from "./store";

function Login(props) {
    if (props.redirect) {
        return <Redirect to="/"/>;
    } else {
        return <LoginForm login={props.login}/>;
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: props.login,
            model: {
                email: "",
                password: "",
            },
            rule: {
              email: [
                  {required: true, message: "Email is required", trigger: "blur"},
                  {type: "email", message: "Please enter a valid email address"}
              ],
              password: [
                  {required: true, message: "Password field is required", trigger: "blur"},
                  {validator: (rule, value, callback) => {
                      if (value.length < 8) {
                          callback(new Error("The length of password is at least 8 characters"));
                      } else {
                          callback();
                      }
                  }},
              ],
            },
        };
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
                this.setState({login: false});

                let email = $("#email").val();
                let pass = $("#password").val();

                let text = {
                    email: email,
                    pass: pass,
                };

                $.ajax(token_path, {
                    method: "post",
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(text),
                    success: (resp) => {
                        console.log(resp);
                        Message({
                            message: "Welcome Back!",
                            type: "success",
                        });
                        this.setState({login: false});
                        store.dispatch({
                            type: "SET_TOKEN",
                            token: resp,
                        });
                        store.dispatch({
                            type: "REDIRECT",
                        });
                        store.dispatch({
                            type: "NOREDIRECT",
                        });
                        window.localStorage.setItem("token", resp.token);
                        window.localStorage.setItem("name", resp.user_name);
                        window.localStorage.setItem("id", resp.user_id);
                    },
                    error: () => {
                        this.setState({login: true});
                    }
                });
            }
        })

    }

    render() {
      return(
        <Layout.Row type="flex" justify="center" align="middle">
            <Layout.Col span="8" xs="24" lg="6">
                <h3>Login</h3>
                <Warning login={this.state.login}/>
                <Form ref="form" model={this.state.model} rules={this.state.rule}
                        onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label="Email address" prop="email">
                        <Input id="email" onChange={this.onChange.bind(this, "email")} />
                    </Form.Item>
                    <Form.Item label="Password" prop="password">
                        <Input type="password" id="password" onChange={this.onChange.bind(this, "password")}/>
                    </Form.Item>
                    <Layout.Row type="flex" justify="space-between" align="middle">
                        <Layout.Col span="6">
                            <Button nativeType="submit" type="primary">
                                Submit
                            </Button>
                        </Layout.Col>
                        <Layout.Col span="6" style={{textAlign: "right"}}>
                            <Link to="/newuser">
                                New User
                            </Link>
                        </Layout.Col>
                    </Layout.Row>
                </Form>
            </Layout.Col>
        </Layout.Row>
      );
    };
}

function Warning(props) {
    let login = props.login;
    if (login) {
        return(
          <Alert title="Incorrect Email or Password!" type="error" showIcon={true}/>
        );
    } else {
        return null;
    }
}

function state2props(state) {
    return {
        redirect: state.redirect,
        login: state.login,
    };
}

export default connect(state2props)(Login)
