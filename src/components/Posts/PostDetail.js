import React, { Component } from 'react'
import { Modal, Row, Col, Avatar, Card, Icon, Input, Button } from 'antd';

// Component:
import Comments from './Comments/index';

const { Meta } = Card;

export default class PostDetail extends Component {
    constructor(props) {
        super(props);

        console.log(this.props)    
    }

    render() {
        return (
            <div>
                <Modal
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                    footer={[null,null]}
                    closable={false}
                >
                    <Row>
                        <Col span={2}>
                            <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={21}><b>Chích Chòe</b></Col>
                    </Row>

                    <Row>
                        <Col span={3}></Col>
                        <Col span={20}>
                        Họa Mi (tên khai sinh Trương Thị Mỹ, sinh năm 1955) là ca sĩ nhạc trữ tình Việt Nam.
                        Bà cùng với ca sĩ Sơn Ca đều là học trò của nhạc sĩ nổi tiếng Hoàng Thi Thơ.
                        Họa Mi được nhận xét có "giọng hát trong và thánh thót ở những nốt cao, ấm áp và tình cảm ở những nốt trầm".
                        Họa Mi định cư tại Pháp từ năm 1988. Năm 2009, bà về thu âm ba album ở Việt Nam.
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={3}></Col>
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
                        <Col span={1}></Col>
                    </Row>

                    <br></br>
                    <Row>
                        <Col span={3}></Col>
                        <Col span={20}>
                            <Row>
                                <Col span={3}><Icon type="heart" /></Col>
                                <Col span={3}><Icon type="message" /></Col>
                                <Col span={3}><Icon type="share-alt" /></Col>
                            </Row>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={3}></Col>
                        <Col span={20}>
                            <Input.TextArea
                                defaultValue="Nhập bình luận"
                            />
                        </Col>
                        <Col span={1}></Col>
                    </Row>

                    <br/>
                    <Row>
                        <Col span={21}></Col>
                        <Col span={2}>
                            <Button type="primary" shape="circle" icon="rocket" />
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                    <br/>
                
                    <Row>
                        <Col span={3}></Col>
                        <Col span={20}>
                            <Comments/>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                    <br/>
                    
                </Modal>
            </div>
        );
    }
}

