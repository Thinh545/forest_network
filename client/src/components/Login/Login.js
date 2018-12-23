import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Icon, Layout, Button, Modal } from 'antd';
import './style.css';
import { Link } from 'react-router-dom';
import  {API_ACCOUNT} from '../../configs/index';
import axios from 'axios';
import * as StellarSdk from 'stellar-sdk';
import { sign } from './../../helpers/tx/index'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            account: '',
            address: ''
        }
    }

    render(){
        return (
            <div>
                <Layout style = {styles.container}>
                    <Layout style = {styles.leftWrapper}>
                        <div className = 'left-item'>
                            <Icon type="search" style = {styles.icon}/>
                            <label className = 'left-text'>
                                Follow your interests.
                            </label>
                        </div>
                        <div className = 'left-item'>
                            <Icon type="team" style = {styles.icon}/>
                            <label className = 'left-text'>
                                Hear what people are talking about.
                            </label>
                        </div>
                        <div className = 'left-item'>
                            <Icon type="message" style = {styles.icon}/>
                            <label className = 'left-text'>
                                Join the conversation.
                            </label>
                        </div>
                        
                        
                       
                    </Layout>
                    <Layout style = {styles.rightWrapper}>
                        <img src = {require('../../images/bird.png')} className = 'logo'/>
                        <label className = 'title'>
                            See what’s happening in the world right now
                        </label>
                        <Layout style = {styles.rightBottomWrapper}>
                            <Input
                                defaultValue = 'Input your public key'
                                style = {styles.inputStyle}
                                color = 'black'
                            />
                            <Button 
                                style = {styles.loginButton}
                            >
                                <Link to = '/'>
                                    Login
                                </Link>
                            </Button>
                        </Layout>
                        <Layout style = {styles.signUpWrapper}>
                            <label style = {styles.joinText}>Join Forest Network today.</label>
                            <Button style = {styles.signUpButton} onClick = {() => {this.setState({modalVisible: true})}}>
                                Sign Up
                            </Button>
                        </Layout>
                    </Layout>
                </Layout>
                <Modal
                    visible = {this.state.modalVisible}
                    onCancel = {() => {this.setState({modalVisible: false})}}
                    closable = {false}
                    okText = {'Sign Up'}
                    okButtonProps = {{style: {borderRadius: 100}}}
                    cancelButtonProps = {{style: {borderRadius: 100}}}
                    onOk = {() => {
                        this.props._handleSignUp(this.state.account, this.state.address);
                    }}
                >
                    <Input
                        placeholder = 'Input your public key'
                        style = {{borderRadius: 100, marginBottom: window.innerHeight * 0.02}}
                        color = 'black'
                        onChange = {(e) => {
                            this.setState({account: e.target.value});
                        }}
                    />
                    <Input
                        placeholder = 'Input your address'
                        style = {{borderRadius: 100}}
                        color = 'black'
                        onChange = {(e) => {
                            this.setState({address: e.target.value});
                        }}
                    />
                </Modal>
            </div>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    rightWrapper: {
        flex: 1,
        backgroundColor: 'white'
    },
    rightBottomWrapper: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    leftWrapper: {
        flex: 1, 
        backgroundColor: '#3C86FC',
        height: window.innerHeight,
        justifyContent: 'center',
    },
    inputStyle: {
        width: '80%',
        marginLeft: 10,
        borderColor: '#CCCFCE',
        fontWeight: '500',
        backgroundColor: '#FFFDA0',
        borderRadius: 100,
    },
    loginButton: {
        width: '20%', 
        borderColor: '#3C86FC',
        color: '#3C86FC',
        fontWeight: '500',
        borderRadius: 100,
        marginLeft: 10,
        marginRight: 10
    },
    icon: {
        color: 'white', 
        fontSize: 25, 
        marginRight: 10
    },
    signUpWrapper: {
        flex: 1, 
        backgroundColor: 'white',
    },
    signUpButton: {
        borderRadius: 100,
        backgroundColor: '#3C86FC',
        color: 'white',
        marginLeft: window.innerWidth * 0.12,
        marginRight: window.innerWidth * 0.12,
        fontWeight: '500'
    },
    joinText: {
        marginLeft: window.innerWidth * 0.12,
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
        marginBottom: window.innerHeight * 0.02
    }
};

const mapStateToProps = () => ({
    _handleSignUp: async (secret, address) => {
        const keypair = StellarSdk.Keypair.fromSecret(secret);
        const account = keypair.publicKey(); 

        const url = API_ACCOUNT + 'create_params?account=' + account + '&public_key=' + address;

        let getTx = await axios({
            url,
            method: 'GET'
        });

        let tx = getTx.data.data;     
        // console.log(getTx.data.data);
        // console.log(tx);

        // console.log(typeof secret);
        sign(tx , secret );
        // console.log(tx);
        // const post_url = API_ACCOUNT + 'create_commit';
        // const postTx = await axios({
        //     url: post_url,
        //     method: 'POST',
        //     data: tx
        // });
    }
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Login);