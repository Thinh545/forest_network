import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Button, Avatar, Row, Badge, Affix, Col, Modal, Input } from 'antd';
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
            isAffixChange: false,
            tweetModalVisible: false,
            content: ''
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

    handleAffixChange = () => {
        console.log(this.state.isAffixChange)

        this.setState({
            isAffixChange: !this.state.isAffixChange,
        })
    }

    channelProfile = () => {
        if (this.state.isAffixChange) {
            return (
                [
                    <Col span={1}> <Avatar shape="square" src={this.props.photoUrl} /></Col>,
                    <Col span={4} style={{fontSize: '20px' }}><strong>{this.props.username}</strong></Col>
                ]
            )
        } else {
            return (
                <Col span={5}>
                    <img src={this.props.photoUrl} style={{ position: "absolute", borderRadius: "50%", zIndex: 3, top: "-150px", maxWidth: "100%", width: "210px" }}></img>
                </Col>
            )
        }
    }

    render() {
        return (
            <Layout className="header">
                <Row style={{ position: 'fixed', zIndex: 999, width: '100%' }}>
                    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '40px' }} selectable={false}>
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
                            <Button 
                                type="primary" 
                                icon="form"
                                onClick = {() => {
                                    this.setState({tweetModalVisible: true});
                                }}
                            >Tweet</Button>
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

                <Affix offsetTop={40} onChange={this.handleAffixChange}>
                    <Row type="flex" align="middle" style={{ background: "white", boxShadow: "0px 1px 3px 0px" }}>
                        <Col span={1}></Col>

                        {this.channelProfile()}

                        {/* <Col span={1}> <Avatar shape="square" icon="user" /></Col>

                        <Col span={4} style={{ width: '230px', fontSize: '20px' }}><strong>Channel</strong></Col> */}

                        <Col span={2} align="center">Posts<br /><strong>0</strong></Col>

                        <Col span={2} align="center">Following<br /><strong>{this.props.following}</strong></Col>

                        <Col span={2} align="center">Followers<br /><strong>{this.props.followers}</strong></Col>

                        <Col span={7}></Col>
                        <Col span={4}>
                            {!this.props.enableEdit && <Button
                                type='danger'
                                ghost
                                onClick={() => {
                                    this.props.switchEditMode(true);
                                }}
                            >Edit Profile</Button>}
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
                        </Col>
                        
                    </Row>
                </Affix>
                <Modal
                    visible = {this.state.tweetModalVisible}
                    onCancel = {() => {this.setState({tweetModalVisible: false})}}
                    footer = {null}
                    title = {'Tạo nội dung post'}
                    bodyStyle = {styles.modalBody}
                >
                    <Input
                        placeholder = 'Có chuyện gì vậy ?'
                        style = {styles.inputTweet}
                        autoFocus = {true}
                        onChange = {(e) => {
                            this.setState({content: e.target.value});
                        }}
                    />
                    <Layout
                        style = {styles.buttonTweetWrapper}
                    >
                        <Button
                            style = {
                                {
                                    width: '20%',
                                    borderRadius: 100,
                                    color: 'white',
                                    fontWeight: '500',
                                    backgroundColor: this.state.content == '' ? '#6DA5FF' : '#3D83F4'
                                }
                            }
                            onClick = {() => {
                                if(this.state.content != ''){
                                    
                                }
                            }}
                        >
                            Đăng bài
                        </Button>
                    </Layout>
                </Modal>
            </Layout>
        )
    }
}

const styles = {
    modalBody: {
        backgroundColor: '#E5EFFF', 
        borderBottomRightRadius: 10, 
        borderBottomLeftRadius: 10,
    },
    inputTweet: {
        height: window.innerHeight * 0.12,
        borderRadius: 8,
        borderColor: '#90B9F9'
    },
    buttonTweetWrapper:{
        marginTop: window.innerHeight * 0.02,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#E5EFFF'
    }
}

const MapStateToProps = (state) => ({
    enableEdit: state['editInfo'].enableEdit,
    photoUrl: state['editInfo'].photoUrl,
    username: state['editInfo'].username,
    description: state['editInfo'].description,
    location: state['editInfo'].location,
    website: state['editInfo'].website,
    following: state['following'].followings.length,
    followers: state['follower'].followers.length,
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
