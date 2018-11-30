import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import './PI.css';

const { Content } = Layout;

class PersonalInfo extends Component{

    render(){
        return(
            <Content style={styles.wrapper}>
                <Content style = {styles.username}>
                    Youtube
                </Content>
                <Content style = {{marginBottom: 10}}>
                    <a href = '@Youtube'>@Youtube</a>
                </Content>
                <Content style = {{color: 'black'}}>
                    Imagine if you couldn’t watch the videos you love. We support copyright reform with an Article 13 that works for everyone. #SaveYourInternet
                </Content>
                <Content style = {styles.joinDate}>
                    <Icon type="environment" style = {{marginRight: 5}}/>
                    San Bruno, CA
                </Content>
                <Content style = {styles.joinDate}>
                    <Icon type="link" style = {{marginRight: 5}}/>
                    <a href = 'https://www.youtube.com'>https://www.youtube.com</a>
                </Content>
                <Content style = {styles.joinDate}>
                    <Icon type="calendar" style = {{marginRight: 10}}/>
                    Joined November 2007
                </Content>
                <Content style = {{marginTop: 20}}>
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
                </Content>
            </Content>
        );
    }
}

const styles = {
    wrapper: {
        background: '#fff', 
        padding: 24, 
        margin: 0, 
        minHeight: 280 
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

export default PersonalInfo;