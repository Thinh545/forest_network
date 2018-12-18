import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Avatar } from 'antd';
import './fllwr.css';
import {
    updateFollower
} from '../../redux/actions/header';

class Following extends Component{

    render() {
        return (
            <div className="infinite-container">
                <List
                    grid = {{column: 3}}
                    dataSource={this.props.follower}
                    renderItem={item => (
                        <List.Item key={item.id} style = {styles.itemStyle}>
                            <img 
                                style = {styles.coverPhoto}
                                src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlI6v_DpTgpK34nSCfMqJwBaM3S4G4k2B8c0a2Xeeq2yfBUcq-'
                            />
                            <Avatar 
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" 
                                shape = 'circle'
                                size = {70}
                                style = {styles.avatarStyle}
                            />
                            <text style = {styles.titleStyle}>{item.title}</text>
                            <div style = {{marginBottom: 35}}>
                                <text style = {{marginLeft: 15}}>{item.email}</text>
                            </div>
                        </List.Item>
                    )}
                >
                </List>
            </div>
        );
    }
}

const styles = {
    contentStyle: {

    },
    coverPhoto: {
        width: '100%', 
        height: 100, 
        marginBottom: 45,
    },
    avatarStyle: {
        position: 'absolute',
        top: 75,
        left: 20,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    itemStyle: {
        flexDirection: 'column',
        margin: 5,
    },
    titleStyle: {
        marginLeft: 15, 
        marginBottom: 10, 
        color: 'black', 
        fontWeight: 'bold'
    }
}

const mapStateToProps = ( state ) => ({
    follower: state['follower'].followers
});

const mapDispatchToProps = ( dispatch ) => ({
    updateFollower: ( follower ) => {
        return dispatch(updateFollower(follower));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Following);