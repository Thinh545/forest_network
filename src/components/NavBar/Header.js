import React, { Component } from 'react';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd'
import SearchBar from './Search'
import Profile from './Profile'

class Header extends Component {

    render() {
        return (
            <Layout className="header">
                <Layout>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '50px' }} >
                        <Menu.Item key="profile">
                            <Profile></Profile>
                        </Menu.Item>

                        <Menu.Item key="home">
                            <Icon type="home" />Home
                        </Menu.Item>

                        <Menu.Item key="notification">
                            <Icon type="bell" />Notifications
                        </Menu.Item>

                        <Menu.Item key="message">
                            <Icon type="message" />Messages
                        </Menu.Item>

                        <Menu.Item key="search" style={{ float: 'right' }}>
                            <SearchBar></SearchBar>
                        </Menu.Item>
                    </Menu>
                </Layout>

                <Layout mode="horizontal" style={{ lineHeight: '100px' }}>
                    <Row>
                        <Col span={6}>col-6</Col>
                        <Col span={3}> <Button type="primary" ghost>Posts</Button> </Col>
                        <Col span={3}> <Button type="primary" ghost>Following</Button> </Col>
                        <Col span={3}> <Button type="primary" ghost>Followers</Button> </Col>
                        <Col span={3}></Col>
                        <Col span={6}>
                            <Button type="danger" ghost>Edit</Button>
                        </Col>
                    </Row>
                </Layout>
            </Layout>
        )
    }
}

export default Header;