import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Input } from 'antd';
import './PI.css';
import {
    updateUsername,
    updateDescription,
    updateLocation,
    updateWebsite
}from '../../../redux/actions/LeftSide';

const { Content } = Layout;

class PersonalInfo extends Component{
    render(){
        return(
            <Content style={styles.wrapper}>
                {!this.props.enableEdit && <Content style = {styles.username}>
                    {this.props.username}
                </Content>}
               {this.props.enableEdit && <Input
                    style = {styles.username}
                    value={this.props.username}
                    onChange = {(e) => {
                        this.props.updateUsername(e.target.value);
                    }}
                />}

                <Content style = {{marginBottom: 10}}>
                    <a href = {this.props.channel}>{this.props.channel}</a>
                </Content>

                {!this.props.enableEdit && <Content style = {{color: 'black'}}>
                    {this.props.description}
                </Content>}
                {this.props.enableEdit && <Content style = {{color: 'black'}}>
                    Description
                    <Input
                        style = {{color: 'black'}}
                        value = {this.props.description}
                        onChange = {(e) => {
                            this.props.updateDescription(e.target.value);
                        }}
                    />
                </Content>}

                {!this.props.enableEdit && <Content style = {styles.joinDate}>
                    <Icon type="environment" style = {{marginRight: 5}}/>
                    {this.props.location}
                </Content>}
                {this.props.enableEdit && <Content style = {styles.joinDate}>
                    <Icon type="environment" style = {{marginRight: 5}}/>
                    <Input
                        style = {{marginRight: 5, color: 'black'}}
                        value = {this.props.location}
                        onChange = {(e) => {
                            this.props.updateLocation(e.target.value);
                        }}
                    />
                </Content>}

                {!this.props.enableEdit && <Content style = {styles.joinDate}>
                    <Icon type="link" style = {{marginRight: 5}}/>
                    <a href = {this.props.website}>{this.props.website}</a>
                </Content>}
                {this.props.enableEdit && <Content style = {styles.joinDate}>
                    <Icon type="link" style = {{marginRight: 5}}/>
                    <Input
                        style = {{marginRight: 5, color: 'black'}}
                        value = {this.props.website}
                        onChange = {(e) => {
                            this.props.updateWebsite(e.target.value);
                        }}
                    />
                </Content>}

                {!this.props.enableEdit && <Content style = {styles.joinDate}>
                    <Icon type="calendar" style = {{marginRight: 10}}/>
                    {this.props.joinDate}
                </Content>}

                {!this.props.enableEdit &&  <Content style = {{marginTop: 20}}>
                    <Content
                        style = {
                            {
                                flexDirection: 'row'
                            }
                        }
                    >
                        <Icon type="picture" style = {styles.imageTitle}/>
                            <a 
                            className = 'image-title'
                            href = '3 photos and videos'
                        >3 photos and videos
                        </a>
                    </Content>
                    <img 
                        className = 'image'
                        src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxadr9ykSPoaet-5e7-_YZtueYaRJSvggWtEShh2EJyAjAf5-D'
                    />
                    <img 
                        className = 'image'
                        src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxadr9ykSPoaet-5e7-_YZtueYaRJSvggWtEShh2EJyAjAf5-D'
                    />
                    <img 
                        className = 'image'
                        src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxadr9ykSPoaet-5e7-_YZtueYaRJSvggWtEShh2EJyAjAf5-D'
                    />
                </Content>}
            </Content>
        );
    }
}

const styles = {
    wrapper: {
        background: '#fff', 
        padding: 24, 
        margin: 0, 
        minHeight: 280,
        minWidth: 280
    },
    username: {
        fontSize: 20, 
        fontWeight: 'bold'
    },
    joinDate: {
        marginTop: 10, 
        flexDirection: 'row'
    },
    imageTitle: {
        marginRight: 10, 
        fontSize: 16
    }
};


const mapStateToProps = ( state ) => ({
    enableEdit: state['editInfo'].enableEdit,
    username: state['editInfo'].username,
    channel: state['editInfo'].channel,
    description: state['editInfo'].description,
    location: state['editInfo'].location,
    website: state['editInfo'].website,
    joinDate: state['editInfo'].joinDate,
});

const mapDispatchToProps = ( dispatch ) => ({
    updateUsername: ( name ) => {
        return dispatch(updateUsername(name));
    },
    updateDescription: ( description ) => {
        return dispatch(updateDescription(description));
    },
    updateLocation: ( location ) => {
        return dispatch(updateLocation(location));
    },
    updateWebsite: ( website ) => {
        return dispatch(updateWebsite(website));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);