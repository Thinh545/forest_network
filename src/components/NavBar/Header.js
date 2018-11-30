import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd'
import SearchBar from './Search'

class Header extends Component {

    render() {
        return (
            <Layout className="header">
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '50px' }} >
                    <Menu.Item key="home">
                        <Icon type="home" />Home
                    </Menu.Item>
                    <Menu.Item key="notification">
                        <Icon type="notification" />Notifications
                    </Menu.Item>
                    <Menu.Item key="message">
                        <Icon type="message" />Messages
                    </Menu.Item>
                    <Menu.Item key="search">
                        <SearchBar></SearchBar>
                    </Menu.Item>
                </Menu>
            </Layout>
        )
    }
}

export default Header;