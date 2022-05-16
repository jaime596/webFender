import { Form, Input, Button, Row, Col, message, } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
// import axios from "axios";

import "./login.css";

// import auth from "../../functions/auth";
import { addUserPost } from "../../routes/index";


const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingIngresar: false,
        };
    }

    componentDidMount() {
        localStorage.clear();
    }

    onFinish = (values) => {
        this.setState({
            loadingIngresar: true,
        });
        this.login(values);
    };

    login = (values) => {
        const Init = {
            method: "POST",
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: values.usuario,
                password: values.password,
                name: values.nombre,
                email: values.email,
                description: values.descripcion === "" ? "Sin descripción" : values.descripcion
            }),
        };

        fetch(addUserPost, Init)
            .then((response) => {
                if (response.ok) {
                    localStorage.setItem("usuario", values.usuario);
                    return response.json();
                } else if (response.status === 401) {
                    message.error("Wrong username or password");
                    this.setState({ loadingIngresar: false });
                    return null;

                } else if (response.status === 400) {
                    message.error("User already exists");
                    this.setState({ loadingIngresar: false });
                    return null;

                } else {
                    message.error("An unexpected error occurred, please try again later");
                    this.setState({ loadingIngresar: false });
                    return null;
                }
            })
            .then((response) => {
                if (response !== null) {
                    this.infoUser(response, values);
                    message.success("account created");
                }
            });
    };

    infoUser = (response) => {
        this.props.history.push("/main");
    };

    onFinishFailed = (errorInfo) => { };

    render() {
        return (
            <div>
                <Row justify="center">
                    <span className="bienvenido unselectable">Sign up!</span>
                </Row>
                <Row justify="center">
                    <Col span={8}></Col>
                    <Col span={8} xl={8}>
                        <Form
                            {...layout}
                            name="Register"
                            initialValues={{
                                usuario: "",
                                password: "",
                                nombre: "",
                                email: "",
                                descripcion: "",


                                remember: true,
                            }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Form.Item
                                name="usuario"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor, ingresa tu usuario.",
                                    },
                                ]}
                            >
                                <Input
                                    autoComplete="off"
                                    placeholder="Usuario"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor, ingresa tu contraseña.",
                                    },
                                ]}
                            >
                                <Input.Password
                                    autoComplete="off"
                                    placeholder="Contraseña"
                                />
                            </Form.Item>

                            <Form.Item
                                name="nombre"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor, ingresa tu nombre.",
                                    },
                                ]}
                            >
                                <Input
                                    autoComplete="off"
                                    placeholder="Nombre"
                                />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor, ingresa tu email.",
                                    },
                                ]}
                            >
                                <Input
                                    type={"email"}

                                    autoComplete="off"
                                    placeholder="Email"
                                />
                            </Form.Item>

                            <Form.Item
                                name="descripcion"
                            >
                                <Input.TextArea
                                    rows={3}
                                    autoComplete="off"
                                    placeholder="Descripción"
                                />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button
                                    className="botonLogin"
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: "100%" }}
                                    loading={this.state.loadingIngresar}
                                >
                                    Registrar
                                </Button>
                            </Form.Item>
                            <Button
                                type="link"
                                style={{ width: "100%" }}
                                onClick={() => {
                                    this.props.history.push("/");

                                }}
                            >
                                go back :C
                            </Button>
                        </Form>

                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div >
        );
    }
}

export default Register;
