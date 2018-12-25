import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const MenuItemGroup = Menu.ItemGroup;

const menu = (
    <Menu>
        <Menu.Item key="name">
            Name - Email
        </Menu.Item>

        <Menu.Item key="2">
            Option 1
        </Menu.Item>

        <Menu.Item key="3">
            Option 2
        </Menu.Item>

    </Menu>
);

class Profile extends Component {
    getMenu = () => {
        if (this.props.isLogin)
            return (
                <Menu>
                    <Menu.Item key="name">
                        {this.props.displayName}
                    </Menu.Item>

                    <Menu.Item key="logout">
                        <Link to = '/'>
                            Logout
                        </Link>
                    </Menu.Item>
                </Menu>
            )

        else
            return (
                <Menu>
                    <Menu.Item key="login">
                        Login
                    </Menu.Item>

                    <Menu.Item key="register">
                        Register
                    </Menu.Item>
                </Menu>
            )
    }

    render() {
        const menu = this.getMenu();

        return (
            
            <Dropdown overlay={menu} placement="bottomLeft">
                <Avatar size={35} src={this.props.avatarUrl} />
            </Dropdown>
        )
    }
}

const MapStateToProps = (state) => ({
    displayName: state['auth'].displayName,
    avatarUrl: state['auth'].avatarUrl,
    isLogin: state['auth'].isLogin,
});

export default connect(MapStateToProps, null)(Profile);