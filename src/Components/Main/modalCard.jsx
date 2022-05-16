import { Modal } from 'antd'
import React, { Component } from 'react'

export default class ModalCard extends Component {
    constructor(props) {
        super(props)
        console.log(props.isModalVisible)
        this.state = {
            isModalVisible: props.isModalVisible
        }
    }

    componentDidUpdate(props) {
        this.setState({ isModalVisible: props.isModalVisible })
    }

    render() {
        return (
            <Modal title="Basic Modal" visible={this.state.isModalVisible} >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        )
    }
}
