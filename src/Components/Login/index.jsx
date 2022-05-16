import { Form, Input, Button, Row, Col, message, Image } from "antd";
import "antd/dist/antd.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { Component } from "react";

import "./login.css";

import auth from "../../functions/auth";
import { loginUserPost } from "../../routes/index";

import logo from "../../assets/rick_88915.png"

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

export class Login extends Component {
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
        user: values.user,
        password: values.password,
      }),
    };

    fetch(loginUserPost, Init)
      .then((response) => {
        if (response.ok) {
          localStorage.setItem("user", values.user);
          return response.json();
        } else if (response.status === 401) {
          message.error("Wrong username or password");
          this.setState({ loadingIngresar: false });
          return null;
        } else {
          message.error("An unexpected error occurred, please try again later");
          this.setState({ loadingIngresar: false });
          return null;
        }
      })
      .then((result) => {
        if (result !== null) {
          if (result.success === 1) {
            localStorage.setItem("IdEmpleado", result.body.id);
            localStorage.setItem(
              "NombreCompleto",
              result.body.name
            );
            localStorage.setItem("email", result.body.email);
            localStorage.setItem("description", result.body.description);
            localStorage.setItem("authorization", result.body.authorization);

            auth.login(() => {
              this.props.history.push("/main");
            });
          } else {
            message.error("An unexpected error occurred, please try again later");
            this.setState({ loadingIngresar: false });
          }
        }
      }).catch((error) => {
        message.error("An unexpected error occurred, please try again later");
        this.setState({ loadingIngresar: false });
      });;
  };



  onFinishFailed = (errorInfo) => { };

  render() {
    return (
      <div>
        <Row justify="center" align="middle" style={{ paddingTop: "26px" }}>
          <Col>
            <Row justify="center">
              <Image
                width={200}
                src={logo}
                preview={false}
              />

            </Row>
          </Col>
          <Col>
            <Row >
              <span className="tituloLogin colorGris unselectable">Rick and Morty</span>
            </Row>
            <Row >
              <span className="tituloLogin colorGris4 unselectable">Fender</span>
            </Row>
          </Col>
        </Row >
        <Row justify="center">
          <span className="bienvenido unselectable">Welcome!</span>
        </Row>
        <Row justify="center">
          <Col span={8}></Col>
          <Col span={8} xl={8}>
            <Form
              {...layout}
              name="Login"
              initialValues={{
                user: "",
                password: "",
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                name="user"
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
                  prefix={<UserOutlined />}
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
                  prefix={<LockOutlined />}
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
                  log in
                </Button>
              </Form.Item>
              <Button
                type="link"
                style={{ width: "100%" }}
                onClick={() => {
                  this.props.history.push("/register");

                }}
              >
                sign in!
              </Button>
            </Form>

          </Col>
          <Col span={8}></Col>
        </Row>
      </div >
    );
  }
}

export default Login;
