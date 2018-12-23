import React, { Component } from 'react'
import { Layout, Icon, Dropdown, Menu } from 'antd';
import PostButton from './PostButton';

const styles = {
    reactionWrapper:  {
        position: 'absolute', 
        top: -70, 
        left: 0, 
        height: 50,
        width: 310, 
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 50,
        borderColor: 'gray'
    }
}

const reactions = (
    <Layout style = {styles.reactionWrapper}>
        <img 
            src="/like.png" 
            width = {'40'} 
            height = {'40'} 
            style = {{backgroundColor: 'white', marginLeft: 10}}
        /> 
        <img 
            src="/heart.png" 
            width = {'40'} 
            height = {'40'} 
            style = {{backgroundColor: 'white', marginLeft: 10}}
        />
        <img 
            src="/haha.png" 
            width = {'40'} 
            height = {'40'} 
            style = {{backgroundColor: 'white', marginLeft: 10}}
        />
        <img 
            src="/wow.png" 
            width = {'40'} 
            height = {'40'} 
            style = {{backgroundColor: 'white', marginLeft: 10}}
        />
        <img 
            src="/sad.png"
            width = {'40'} 
            height = {'40'} 
            style = {{backgroundColor: 'white', marginLeft: 10}}
        />
        <img 
            src="/angry.png" 
            width = {'40'} 
            height = {'40'} 
            style = {{backgroundColor: 'white', marginLeft: 10, marginRight: 10}}
        />
    </Layout>
);

export default class Reaction extends Component{
    render(){
        return(
            <div>
                <Dropdown overlay = {reactions} placement = 'topCenter'>
                    <Icon type= {'heart'}/>
                </Dropdown>
            </div>
        );
    }
}