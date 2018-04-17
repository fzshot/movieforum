import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {Layout, Button, Form, Input, Alert, Message} from "element-react";

import api from "./api";
import store from "./store";

export default function NewUser(props){
    return <NewUserForm/>;
}


class NewUserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {
                name: "",
                email: "",
                password: "",
                cpassword: "",
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

        this.refs.form.validate((valid) => {});
    }

    render() {
        return(
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
                        <Layout.Row type="flex" justify="space-between" align="middle">
                            <Layout.Col span="6">
                                <Button nativeType="submit" type="primary">
                                    Submit
                                </Button>
                            </Layout.Col>
                        </Layout.Row>
                    </Form>
                </Layout.Col>
            </Layout.Row>
        );
    }
}
