import React, { Component } from 'react';
import { Layout, Menu, Icon, Button, Avatar } from 'antd'
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

                <Layout>
                    <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
                        <Menu.Item key="info" style={{ width: '70px' }}>
                            <Avatar shape="square" size="64" icon="user" />
                        </Menu.Item>
                        <Menu.Item key="info" style={{ width: '230px', fontSize: '20px' }}>
                            <strong>Channel</strong>
                        </Menu.Item>

                        <Menu.Item key="posts">
                            Posts: <strong>0</strong>
                        </Menu.Item>

                        <Menu.Item key="following">
                            Following: <strong>0</strong>
                        </Menu.Item>

                        <Menu.Item key="followers">
                            Followers: <strong>0</strong>
                        </Menu.Item>

                        <Menu.Item key="edit" style={{ float: 'right' }}>
                            <Button type='danger' ghost>Edit</Button>
                        </Menu.Item>
                    </Menu>
                </Layout>
            </Layout>
        )
    }
}

export default Header;
