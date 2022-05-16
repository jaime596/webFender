import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Image,
  Input,
  message,
  Modal,
  Row,
  Spin,
  Statistic,
} from "antd";
import React, { Component } from "react";
import auth from "../../functions/auth";
import { getinfoCharacterGET, addFavCharacter } from "../../routes/index";
import moment from "moment";

export default class CardCharacter extends Component {
  constructor(props) {
    super(props);
    const character = props.character;
    this.state = {
      authorization: localStorage.getItem("authorization"),
      user: localStorage.getItem("user"),
      character: character,
      like: true,
      isModalVisible: false,
      isModalLoading: false,
      loadAddFav: false,
      detail: {},
    };
  }

  componentDidMount() {
    this.loadCharacterDetail(this.state.character.id);
  }

  status = (status) => {
    switch (status) {
      case "Alive":
        return "green";
      case "Dead":
        return "red";
      case "unknown":
        return "gold";
      default:
        return "gold";
    }
  };

  isModalVisible = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  loadCharacterDetail = (id) => {
    this.setState({
      isModalLoading: true,
    });
    const Init = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: this.state.authorization,
        id: id,
      },
    };

    fetch(getinfoCharacterGET(this.state.page), Init)
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
          console.log(result.body);
          this.setState({
            detail: result.body,
            loadingNext: false,
            isModalLoading: false,
          });
        }
      })
      .catch((error) => {
        message.error("An unexpected error occurred, please try again later");
        this.setState({ loadingIngresar: false });
      });
  };

  detail = () => {
    try {
      return (
        <>
          <Row justify="center" align="middle">
            <Col span={24}>
              <Row justify="center" align="middle">
                <Avatar
                  size={128}
                  src={this.state.detail.image}
                  shape="circle"
                ></Avatar>
              </Row>
              <Row justify="center" align="middle">
                <Badge
                  color={this.status(this.state.detail.status)}
                  text={
                    this.state.detail.status + " - " + this.state.detail.species
                  }
                />
              </Row>
            </Col>
          </Row>
          <Row justify="start" align="middle" gutter={8}>
            <Col span={12}>
              <Row justify="center" align="middle" gutter={8}>
                <Col>
                  <Statistic
                    title="Create:"
                    value={moment(this.state.detail.created)
                      .utc()
                      .format("DD/MM/YYYY, h:mm a")}
                  />
                  <Statistic title="Gender:" value={this.state.detail.gender} />
                  <Statistic
                    title="Location:"
                    value={this.state.detail.location.name}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row justify="center" align="middle" gutter={8}>
                <Col>
                  <Statistic
                    title="Origin:"
                    value={this.state.detail.origin.name}
                  />
                  <Statistic
                    title="Type:"
                    value={
                      this.state.detail.type === ""
                        ? "Humman"
                        : this.state.detail.type
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      );
    } catch (error) {
      return <></>;
    }
  };

  addFavCharacter = () => {
    this.setState({
      loadAddFav: true,
    });
    const Init = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: this.state.authorization,
      },
      body: JSON.stringify({
        user: this.state.user,
        idCharacter: this.state.character.id,
      }),
    };

    fetch(addFavCharacter, Init)
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
          this.setState({
            loadAddFav: false,
          });
          message.error("An unexpected error occurred, please try again later");
          this.setState({ loadingIngresar: false });
          return null;
        }
      })
      .then((result) => {
        if (result != null) {
          console.log(result.body[0].message);
          if (result.body[0].message === 0) {
            message.warning("it's already in your favorites C:");
          } else {
            message.success("it's added!");
          }

          this.setState({
            loadAddFav: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          loadAddFav: false,
        });
        message.error("An unexpected error occurred, please try again later");
        this.setState({ loadingIngresar: false });
      });
  };

  render() {
    return (
      <Card
        title={this.state.character.name}
        key={this.state.character.id}
        bordered={true}
        style={{ width: "45%", margin: "1%" }}
        extra={
          <Button
            loading={this.state.loadAddFav}
            className="botonLogin"
            type="primary"
            style={{ width: "100%" }}
            onClick={() => {
              this.addFavCharacter();
            }}
          >
            Add to favorites!
          </Button>
        }
      >
        <Row gutter={8}>
          <Col span={12}>
            <Image src={this.state.character.image} />
          </Col>
          <Col span={12}>
            <Input.Group size="default">
              <Row gutter={8} justify="start">
                <Col>
                  <Statistic
                    title="Last known location:"
                    value={this.state.character.location.name}
                  />
                </Col>
              </Row>
              <Row gutter={8} justify="start">
                <Col>
                  <Badge
                    color={this.status(this.state.character.status)}
                    text={
                      this.state.character.status +
                      " - " +
                      this.state.character.species
                    }
                  />
                </Col>
              </Row>
              <Row gutter={8} justify="start">
                <Col>
                  <Button
                    loading={this.state.loadingNext}
                    className="botonLogin"
                    type="primary"
                    style={{ width: "100%" }}
                    onClick={() => {
                      this.isModalVisible();
                    }}
                  >
                    Details!
                  </Button>
                </Col>
              </Row>
            </Input.Group>
            <Modal
              width="70%"
              title={this.state.detail.name}
              visible={this.state.isModalVisible}
              okText="close!"
              okButtonProps={{ className: "botonLogin" }}
              onCancel={() => {
                this.setState({
                  isModalVisible: false,
                });
              }}
              onOk={() => {
                this.setState({
                  isModalVisible: false,
                });
              }}
              footer={
                <Button
                  loading={this.state.loadingNext}
                  className="botonLogin"
                  type="primary"
                  block="true"
                  style={{ width: "100%" }}
                  onClick={() => {
                    this.isModalVisible();
                  }}
                >
                  go back!
                </Button>
              }
            >
              {this.state.isModalLoading ? (
                <Row justify="center" align="middle">
                  <Spin />
                </Row>
              ) : (
                this.detail()
              )}
            </Modal>
          </Col>
        </Row>
      </Card>
    );
  }
}
