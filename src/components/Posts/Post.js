import React, { Component } from 'react'
import { Row, Col, Avatar, Card, Icon } from 'antd';

// Component: 
import PostDetail from './PostDetail';

const { Meta } = Card;

export default class Post extends Component {
    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        return (

            <div>
                <div onClick={this.showModal}>
                    <Row>
                        <Col span={2}>
                            <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </Col>
                        <Col span={6}><b>Chích Chòe</b></Col>
                        <Col span={16}>16 phút trước</Col>
                    </Row>

                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                        Họa Mi (tên khai sinh Trương Thị Mỹ, sinh năm 1955) là ca sĩ nhạc trữ tình Việt Nam.
                        Bà cùng với ca sĩ Sơn Ca đều là học trò của nhạc sĩ nổi tiếng Hoàng Thi Thơ.
                        Họa Mi được nhận xét có "giọng hát trong và thánh thót ở những nốt cao, ấm áp và tình cảm ở những nốt trầm".
                        Họa Mi định cư tại Pháp từ năm 1988. Năm 2009, bà về thu âm ba album ở Việt Nam.
                        </Col>
                        <Col span={2}></Col>
                    </Row>

                    <br></br>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <Card
                                hoverable
                                cover={<img alt="post-pic" src="https://thegioidongvat.co/wp-content/uploads/2018/05/chim-hoa-mi-4.jpg" />}
                            >
                                <Meta
                                    title="Họa Mi hót suốt ngày"
                                    description="www.hoamifanclub.com"
                                />
                            </Card>
                        </Col>
                        <Col span={2}></Col>
                    </Row>

                    <br></br>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <Row>
                                <Col span={3}><Icon type="heart" /></Col>
                                <Col span={3}><Icon type="message" /></Col>
                                <Col span={3}><Icon type="share-alt" /></Col>
                            </Row>
                        </Col>
                        <Col span={2}></Col>
                    </Row>


                </div>
                <PostDetail
                    visible = {this.state.visible}  
                    handleOk = {this.handleOk}
                    handleCancel = {this.handleCancel}
                />
                {/* <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal> */}
            </div>
        )
    }
}
