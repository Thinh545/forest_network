import React, { Component } from 'react';
import { Dropdown, Menu, Avatar } from 'antd';

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
    render() {
        return (
            <Dropdown overlay={menu} placement="bottomLeft">
                <Avatar size={45} src='anonymous.png' />
            </Dropdown>
        )
    }
}

export default Profile;