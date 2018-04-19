import React from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {Layout, Button, Form, Input, Alert, Message} from "element-react";
import ReCAPTCHA from "react-google-recaptcha";

import api from "./api";
import store from "./store";

function NewUser(props){
    return <NewUserForm/>;
}


class NewUserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            model: {
                name: "",
                email: "",
                password: "",
                cpassword: "",
                captcha: "",
            },
            rule: {
                name: [
                    {required: true, message: "Nick Name is reired", trigger: "blur"}
                ],
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
                            if ("" != this.state.model.cpassword) {
                                this.refs.form.validateField("cpassword");
                            }
                            callback();
                        }
                    }},
                ],
                cpassword: [
                    {required: true, message: "Please enter the password again", trigger: "blur"},
                    {validator: (rule, value, callback) => {
                        if (value != this.state.model.password) {
                            callback(new Error("Passwors are not the same!"));
                        } else {
                            callback();
                        }
                    }}
                ],
                captcha: [
                    {required: true, message: "Please complete the CAPTCHA check"},
                ],
            }
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
                let path = "/api/v1/users";

                let text = {
                    user: {
                        name: this.state.model.name,
                        email: this.state.model.email,
                        password: this.state.model.password,
                        captcha: this.state.model.captcha,
                    }
                };

                $.ajax(path, {
                    method: "post",
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(text),
                    success: () => {
                        Message({
                            message: "Greeting, new friend!",
                            type: "success",
                        });
                        this.setState({redirect: true});
                    },
                    error: (resp) => {
                        let error = JSON.parse(resp.responseText);
                        let myerror = resp.responseJSON;
                        if (error.errors) {
                            let errortext = "email "+error.errors.email[0];
                            Message({
                                showClose: true,
                                duration: 0,
                                message: errortext,
                                type: "error",
                            });
                        } else if (myerror.myerror) {
                            Message({
                                showClose: true,
                                duration: 0,
                                message: error.myerror,
                                type: "error",
                            });
                        } else {
                            Message({
                                showClose: true,
                                duration: 0,
                                message: "Some unknown error, please try again later.",
                                type: "error",
                            });
                        }
                    }
                });
            }

        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/"/>;
        }
        else {
            return (
                <Layout.Row type="flex" align="middle" justify="center">
                    <Layout.Col span="8" xs="24" lg="6">
                        <h3>Registration</h3>
                        <Form ref="form" model={this.state.model} rules={this.state.rule} onSubmit={this.onSubmit.bind(this)}>
                            <Form.Item label="Nick Name" prop="name">
                                <Input  onChange={this.onChange.bind(this, "name")} />
                            </Form.Item>
                            <Form.Item label="Email address" prop="email">
                                <Input  onChange={this.onChange.bind(this, "email")} />
                            </Form.Item>
                            <Form.Item label="Password" prop="password">
                                <Input type="password" onChange={this.onChange.bind(this, "password")}/>
                            </Form.Item>
                            <Form.Item label="Comfirm Password" prop="cpassword">
                                <Input type="password" onChange={this.onChange.bind(this, "cpassword")}/>
                            </Form.Item>
                            <Form.Item prop="captcha">
                                    <ReCAPTCHA
                                        sitekey="6LdcA1AUAAAAAGafdWuRgSg65zQMmaABOApAL9dS"
                                        onChange={this.onChange.bind(this, "captcha")}
                                    />
                            </Form.Item>
                            <Form.Item>
                                    <Button nativeType="submit" type="primary">
                                        Submit
                                    </Button>
                            </Form.Item>
                        </Form>
                    </Layout.Col>
                </Layout.Row>
            );
        }
    }
}

function state2props(state) {
    return {
        redirect: state.redirect,
    }
}

export default connect(state2props)(NewUser)
