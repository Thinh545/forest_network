import React, { Component } from 'react'
import { Row, Col, Avatar, Card, Icon } from 'antd';

const { Meta } = Card;

export default class Post extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </Col>
                    <Col span={3}><b>Nguyễn Trí Thâm</b></Col>
                    <Col span={16}>16 phút trước</Col>
                </Row>

                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <br></br>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Card
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                        >
                            <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <br></br>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Icon type="heart" />
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}
