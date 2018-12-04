import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Button, Avatar, Row, Badge, Affix } from 'antd';
import SearchBar from './Search'
import Profile from './Profile'
import { switchEditMode } from '../../redux/actions/LeftSide';
import {
    updateUsername,
    updateDescription,
    updateLocation,
    updateWebsite,
} from '../../redux/actions/LeftSide';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            description: null,
            location: null,
            website: null,
            pressSave: false,
        }
    }

    componentDidMount() {
        this.setState({
            username: this.props.username,
            description: this.props.description,
            location: this.props.location,
            website: this.props.website
        })
    }

    componentWillUnmount() {
        if (!this.state.pressSave) {
            this.props.updateInformation(
                this.state.username,
                this.state.description,
                this.state.location,
                this.state.website
            )
        }
    }

    render() {
        return (
            <Layout className="header">
                <Row style={{ position: 'fixed', zIndex: 999, width: '100%' }}>
                    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '40px' }} >
                        <Menu.Item key="home">
                            <Icon type="home" />Home
                        </Menu.Item>

                        <Menu.Item key="notification">
                            <Badge dot={true}>
                                <Icon type="bell" />
                            </Badge>
                            &nbsp;&nbsp;Notifications
                        </Menu.Item>
    
                        <Menu.Item key="message">
                            <Badge dot={true}>
                                <Icon type="message" />
                            </Badge>
                            &nbsp;&nbsp;Messages
                        </Menu.Item>

                        <Menu.Item key="tweet" style={{ float: 'right' }}>
                            <Button type="primary" icon="form">Tweet</Button>
                        </Menu.Item>

                        <Menu.Item key="profile" style={{ float: 'right' }}>
                            <Profile></Profile>
                        </Menu.Item>

                        <Menu.Item key="search" style={{ float: 'right' }}>
                            <SearchBar></SearchBar>
                        </Menu.Item>
                    </Menu>
                </Row>

                <Row style={{ height: "360px", marginTop: "40px" }}>
                    <img src="https://www.image.ie/images/logo.svg?v=3" style={{ inlineSize: "-webkit-fill-available", maxHeight: "360px" }}></img>
                </Row>

                <Row>
                    <Affix offsetTop={40}>
                        <Menu mode="horizontal" style={{ lineHeight: '50px' }}>
                            <Menu.Item key="info" style={{ width: '70px' }}>
                                <Avatar shape="square" size="48" icon="user" />
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
                                {!this.props.enableEdit && <Button
                                    type='danger'
                                    ghost
                                    onClick={() => {
                                        this.props.switchEditMode(true);
                                    }}
                                >Edit</Button>}
                                {this.props.enableEdit && <Button
                                    type='danger'
                                    ghost
                                    onClick={() => {
                                        this.props.switchEditMode(false);
                                        this.props.updateInformation(
                                            this.state.username,
                                            this.state.description,
                                            this.state.location,
                                            this.state.website
                                        )
                                    }}
                                    style={{ marginRight: '5%' }}
                                >Cancel</Button>}
                                {this.props.enableEdit && <Button
                                    type='danger'
                                    ghost
                                    onClick={() => {
                                        this.props.switchEditMode(false);
                                        this.props.updateInformation(
                                            this.props.username,
                                            this.props.description,
                                            this.props.location,
                                            this.props.website
                                        );
                                        this.setState({
                                            username: this.props.username,
                                            description: this.props.description,
                                            location: this.props.location,
                                            website: this.props.website,
                                            pressSave: true
                                        });
                                    }}
                                >Save</Button>}
                            </Menu.Item>
                        </Menu>
                    </Affix>
                </Row>
            </Layout>
        )
    }
}

const MapStateToProps = (state) => ({
    enableEdit: state['editInfo'].enableEdit,
    username: state['editInfo'].username,
    description: state['editInfo'].description,
    location: state['editInfo'].location,
    website: state['editInfo'].website
});

const MapDispatchToProps = (dispatch) => ({
    switchEditMode: (mode) => {
        return dispatch(switchEditMode(mode));
    },
    updateInformation: (name, description, location, website) => {
        dispatch(updateUsername(name));
        dispatch(updateDescription(description));
        dispatch(updateLocation(location));
        dispatch(updateWebsite(website));
    },
});

export default connect(MapStateToProps, MapDispatchToProps)(Header);
