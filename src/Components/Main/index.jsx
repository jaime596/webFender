import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Divider, Image, message, Popconfirm, Row } from 'antd'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import logo from "../../assets/rick_88915.png"
import auth from '../../functions/auth';
import { getCharactersGET } from '../../routes/index';
import CardCharacter from './cardCharacter';

import "./main.css";



class Main extends Component {

    constructor(props) {

        super(props)

        this.state = {
            authorization: localStorage.getItem("authorization"),
            character: [],
            page: 1,
            loadingNext: false
        }

    }

    componentDidMount() {
        this.loadCharacter()
    }

    loadCharacter = () => {
        const Init = {
            method: "GET",
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "authorization": this.state.authorization
            }
        };

        fetch(getCharactersGET(this.state.page), Init)
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
                        character: this.state.character.concat(result.body.results),
                        loadingNext: false
                    })
                }

            }).catch((error) => {
                message.error("An unexpected error occurred, please try again later");
                this.setState({ loadingIngresar: false });
            });;
    }

    render() {
        return (
            <div>
                <Row justify="start">
                    <Col span={8}>
                        <Row justify="start" style={{ paddingLeft: "10%" }}>
                            <Col>
                                <Image
                                    className='LogoFormat'
                                    src={logo}
                                    preview={false}
                                />
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
                                        this.props.history.push("/profile");
                                    }}
                                    icon={<MenuOutlined />}
                                >
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ paddingTop: "1.5%", paddingBottom: "1%" }}>
                    <Col span={24}>
                        <Divider className='Divider' />
                    </Col>
                </Row>
                <Row gutter={16} style={{ paddingTop: "1.5%", paddingBottom: "1%" }}>
                    {
                        this.state.character.map(elemento => {
                            return <CardCharacter character={elemento} />
                        })
                    }
                </Row>
                <Row gutter={16} style={{ paddingTop: "1.5%", paddingBottom: "1%" }} align="middle" justify='center'>
                    <Col>
                        <Button
                            loading={this.state.loadingNext}
                            className="botonLogin"
                            type="primary"
                            style={{ width: "100%" }}
                            onClick={() => {
                                this.setState({
                                    page: this.state.page + 1,
                                    loadingNext: true
                                }, () => {
                                    this.loadCharacter()
                                })
                            }}
                        >
                            Next!
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Main);
