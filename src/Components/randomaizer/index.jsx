import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Divider, Image, Popconfirm, Row, Button } from 'antd';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';


import logo from "../../assets/rick_88915.png"
import auth from '../../functions/auth';
import { getinfoCharacterGET } from '../../routes/index';
import CardFavCharacter from '../profile/cardFavCharacter';



class Randomaizer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            authorization: localStorage.getItem("authorization"),
            rick: {},
            pokemon: {
            }
        }
    }

    componentDidMount() {
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
                                    <Avatar
                                        onError={false}
                                        style={{ marginTop: 25, marginRight: "15%" }}
                                        size={64}
                                        src={""}
                                        icon={<UserOutlined />}
                                    />
                                </Popconfirm>
                            </Col>
                            <Col>
                                <Button
                                    shape="circle"
                                    style={{ marginTop: 25, marginRight: "15%", marginLeft: "5" }}
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
                <CardFavCharacter character={{ idCharacter: Math.floor(Math.random() * (826 - 0)) + 0, idPokemon: Math.floor(Math.random() * (898 - 0)) + 0 }}></CardFavCharacter>
            </div>
        )
    }
}


export default withRouter(Randomaizer);
