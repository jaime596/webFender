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
import { getinfoCharacterGET } from "../../routes/index";
import moment from "moment";
const { Meta } = Card;

export default class CardFavCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorization: localStorage.getItem("authorization"),
      character: {},
      like: true,
      isModalVisible: false,
      isModalLoading: false,
      isLoadingCard: true,
      detail: {},
    };
  }

  componentDidMount() {
    this.loadCharacterDetail(this.props.character.idCharacter);
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

    fetch(getinfoCharacterGET(), Init)
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
            character: result.body,
            isLoadingCard: false,
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
                  src={this.state.character.image}
                  shape="circle"
                ></Avatar>
              </Row>
              <Row justify="center" align="middle">
                <Badge
                  color={this.status(this.state.character.status)}
                  text={
                    this.state.character.status +
                    " - " +
                    this.state.character.species
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
                    value={moment(this.state.character.created)
                      .utc()
                      .format("DD/MM/YYYY, h:mm a")}
                  />
                  <Statistic
                    title="Gender:"
                    value={this.state.character.gender}
                  />
                  <Statistic
                    title="Location:"
                    value={this.state.character.location.name}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row justify="center" align="middle" gutter={8}>
                <Col>
                  <Statistic
                    title="Origin:"
                    value={this.state.character.origin.name}
                  />
                  <Statistic
                    title="Type:"
                    value={
                      this.state.character.type === ""
                        ? "Humman"
                        : this.state.character.type
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

  render() {
    return this.state.isLoadingCard ? (
      <Card
        style={{ width: "45%", margin: "1%" }}
        loading={this.state.isLoadingCard}
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="Card title"
          description="This is the description"
        />
      </Card>
    ) : (
      <Card
        title={this.state.character.name}
        key={this.state.character.id}
        bordered={true}
        style={{ width: "45%", margin: "1%" }}
        // extra={
        //     <Button
        //         loading={this.state.loadingNext}
        //         className="botonLogin"
        //         type="primary"
        //         style={{ width: "100%" }}
        //         onClick={() => {

        //         }}
        //     >
        //         {this.state.character.fav ? "Remove from favorites :C" : "Add to favorites!"}
        //     </Button>
        // }
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
