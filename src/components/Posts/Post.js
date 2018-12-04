import React, { Component } from 'react'
import { Row, Col, Avatar, Card, Icon } from 'antd';

// Component: 
import PostDetail from './PostDetail';
import PostButton from './PostButton';

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
                        <Col span={20}><b>Chích Chòe</b>&nbsp;&nbsp;&nbsp;&nbsp;16 phút trước</Col>
                        <Col span={2}></Col>
                    </Row>

                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            Họa Mi (tên khai sinh Trương Thị Mỹ, sinh năm 1955) là ca sĩ nhạc trữ tình Việt Nam.
                            Bà cùng với ca sĩ Sơn Ca đều là học trò của nhạc sĩ nổi tiếng Hoàng Thi Thơ.
                        Họa Mi được nhận xét ... <span className="read-more">Read More</span>

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
                                <Col span={3}>
                                    <PostButton type="heart" />
                                </Col>
                                <Col span={3}>
                                    <PostButton type="message" />
                                </Col>

                                <Col span={3}>
                                    <PostButton type="share-alt" />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={2}></Col>
                    </Row>

                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <br />
                            <hr />
                            <br />
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </div>
                <PostDetail
                    visible={this.state.visible}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                />

            </div>
        )
    }
}
