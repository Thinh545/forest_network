import React, { Component } from 'react';
import { Dropdown, Menu, Avatar } from 'antd';

const MenuItemGroup = Menu.ItemGroup;

const menu = (
    <Menu>
        <Menu.Item disabled>
            Name
        </Menu.Item>

        <Menu.Item disabled>
            Email
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