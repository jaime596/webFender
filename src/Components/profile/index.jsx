import { RollbackOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  message,
  Popconfirm,
  Row,
} from "antd";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import logo from "../../assets/rick_88915.png";
import auth from "../../functions/auth";
import { modUserPut, delUserDelete, allFavCharacter } from "../../routes/index";
import CardFavCharacter from "./cardFavCharacter";

import "./profile.css";

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

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authorization: localStorage.getItem("authorization"),
      user: localStorage.getItem("user"),
      name: localStorage.getItem("NombreCompleto"),
      email: localStorage.getItem("email"),
      description: localStorage.getItem("description"),
      isLoadingMod: false,
      isLoadingDel: false,
      loadingFav: false,
      favCharacters: [],
    };
  }

  componentDidMount() {
    this.loadCharacter();
  }

  loadCharacter = () => {
    const Init = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: this.state.authorization,
        user: this.state.user,
      },
    };

    fetch(allFavCharacter, Init)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          message.error("Sesión vencida");
          auth.logout(() => {
            this.props.history.push("/");
          });
          return null;
        } else {
          message.error("An unexpected error occurred, please try again later");
          this.setState({ loadingIngresar: false });
          return null;
        }
      })
      .then((result) => {
        if (result != null) {
          this.setState({
            favCharacters: result.body,
            loadingFav: false,
          });
        }
      })
      .catch((error) => {
        message.error("An unexpected error occurred, please try again later");
        this.setState({ loadingIngresar: false });
      });
  };

  onFinish = (values) => {
    this.setState({
      isLoadingMod: true,
    });
    this.modUser(values);
  };

  modUser = (values) => {
    const Init = {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: this.state.authorization,
      },
      body: JSON.stringify({
        user: this.state.user,
        password: values.password ? values.password : "",
        name: values.nombre,
        email: values.email,
        description:
          values.descripcion === "" ? "Sin descripción" : values.description,
      }),
    };

    fetch(modUserPut, Init)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          auth.logout(() => {
            this.props.history.push("/");
          });
        } else {
          this.setState({
            isLoadingMod: false,
          });
          message.error("An unexpected error occurred, please try again later");
          this.setState({ loadingIngresar: false });
          return null;
        }
      })
      .then((result) => {
        console.log(result);
        if (result !== null) {
          if (result.success === 1) {
            localStorage.setItem("IdEmpleado", result.body[0].id);
            localStorage.setItem("NombreCompleto", result.body[0].name);
            localStorage.setItem("email", result.body[0].email);
            localStorage.setItem("description", result.body[0].description);
            message.success("changes made");
            this.setState({
              isLoadingMod: false,
            });
          } else {
            message.error(
              "An unexpected error occurred, please try again later"
            );
            this.setState({ isLoadingMod: false });
          }
        }
      })
      .catch((error) => {
        this.setState({
          isLoadingMod: false,
        });
        message.error("An unexpected error occurred, please try again later");
        this.setState({ loadingIngresar: false });
      });
  };

  deleteUser = () => {
    const Init = {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: this.state.authorization,
      },
      body: JSON.stringify({
        user: this.state.user,
      }),
    };

    fetch(delUserDelete, Init)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          auth.logout(() => {
            this.props.history.push("/");
          });
        } else {
          this.setState({
            isLoadingDel: false,
          });
          message.error("An unexpected error occurred, please try again later");
          this.setState({ loadingIngresar: false });
          return null;
        }
      })
      .then((result) => {
        console.log(result);
        if (result !== null) {
          if (result.success === 1) {
            message.success("chale :C, account deleted");
            auth.logout(() => {
              this.props.history.push("/");
            });
          } else {
            message.error(
              "An unexpected error occurred, please try again later"
            );
            this.setState({ isLoadingDel: false });
          }
        }
        this.setState({
          isLoadingDel: false,
        });
      })
      .catch((error) => {
        this.setState({
          isLoadingDel: false,
        });
        message.error("An unexpected error occurred, please try again later");
        this.setState({ loadingIngresar: false });
      });
  };

  render() {
    return (
      <div>
        <Row justify="start">
          <Col span={8}>
            <Row justify="start" style={{ paddingLeft: "10%" }}>
              <Col>
                <Image className="LogoFormat" src={logo} preview={false} />
              </Col>
            </Row>
          </Col>
          <Col span={8} offset={8}>
            <Row justify="end" style={{ paddingRight: "10%" }}>
              <Col>
                <Popconfirm
                  placement="bottomRight"
                  title="Sing out"
                  onConfirm={() => {
                    auth.logout(() => {
                      this.props.history.push("/");
                    });
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  {typeof this.state.usuario === "object" ? (
                    <Avatar
                      onError={false}
                      style={{ marginTop: 25, marginRight: "15%" }}
                      size={64}
                      src={""}
                      icon={<UserOutlined />}
                    />
                  ) : (
                    <Avatar
                      onError={false}
                      style={{ marginTop: 25, marginRight: "15%" }}
                      size={64}
                      src={""}
                      icon={<UserOutlined />}
                    />
                  )}
                </Popconfirm>
              </Col>
              <Col>
                <Button
                  shape="circle"
                  style={{ marginTop: 25, marginRight: "15%", marginLeft: "5" }}
                  loading={this.state.loadingNext}
                  className="botonLogin"
                  type="primary"
                  onClick={() => {
                    this.props.history.push("/main");
                  }}
                  icon={<RollbackOutlined />}
                ></Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ paddingTop: "1.5%", paddingBottom: "1%" }}>
          <Col span={24}>
            <Divider className="Divider" />
          </Col>
        </Row>
        <Row align="middle" justify="center">
          <Col span={12}>
            <Form
              {...layout}
              name="Register"
              initialValues={{
                usuario: this.state.user,
                password: "",
                nombre: this.state.name,
                email: this.state.email,
                description: this.state.description,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item name="usuario">
                <Input
                  disabled={true}
                  autoComplete="off"
                  placeholder="Usuario"
                />
              </Form.Item>

              <Form.Item name="password">
                <Input.Password autoComplete="off" placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="nombre"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name.",
                  },
                ]}
              >
                <Input autoComplete="off" placeholder="Name" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email.",
                  },
                ]}
              >
                <Input type={"email"} autoComplete="off" placeholder="Email" />
              </Form.Item>

              <Form.Item name="description">
                <Input.TextArea
                  rows={3}
                  autoComplete="off"
                  placeholder="Description"
                />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button
                  className="botonLogin"
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={this.state.isLoadingMod}
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Row align="middle" justify="center">
              <Col>
                <Popconfirm
                  placement="bottomRight"
                  title="Realy? :CC"
                  onConfirm={() => {
                    this.deleteUser();
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    block={true}
                    className="botonDelete"
                    type="primary"
                    htmlType="submit"
                    loading={this.state.isLoadingDel}
                  >
                    Delete acount
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={16} style={{ paddingTop: "1.5%", paddingBottom: "1%" }}>
          {this.state.favCharacters.map((elemento) => {
            return <CardFavCharacter character={elemento} />;
          })}
        </Row>
      </div>
    );
  }
}

export default withRouter(Profile);
