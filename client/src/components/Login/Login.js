import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Icon, Layout, Button, Modal } from 'antd';
import './style.css';
import { Link } from 'react-router-dom';
import  {API_ACCOUNT, BroadcastTxCommitURL, HOST} from '../../configs/index';
import axios from 'axios';
import querystring from 'querystring';
import {
    Keypair
} from 'stellar-base';
import { updateSecret, updateUserInfo } from '../../redux/actions/RightSide';
import { updateUsername } from '../../redux/actions/LeftSide';
import { sign, encode, decode } from './../../helpers/tx/index'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            account: '',
            address: '',
            key: 'SDXCBYRWNQRQXZQQNDZFMHJ75WY6H2PIDJGJMTNYBONJVX2RZMFUHUYP'
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
                        <img src = '/bird.png' className = 'logo'/>
                        <label className = 'title'>
                            See what’s happening in the world right now
                        </label>
                        <Layout style = {styles.rightBottomWrapper}>
                            <Input
                                defaultValue = 'SDXCBYRWNQRQXZQQNDZFMHJ75WY6H2PIDJGJMTNYBONJVX2RZMFUHUYP'
                                style = {styles.inputStyle}
                                color = 'black'
                                onChange = {(e) => {
                                    this.setState({key: e.target.value});
                                }}
                            />
                            <Button 
                                style = {styles.loginButton}
                                onClick = { async () => {
                                    if(this.state.key != ''){
                                        const result = await this.props.login(this.state.key);
                                        if(result == true){
                                            this.props.history.push('/home');
                                        }   
                                        else{
                                            alert('Đăng nhập thất bại');
                                        }
                                    }
                                }}
                            >
                                Login
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


const mapStateToProps = ( state ) => ({
    
});

const mapDispatchToProps = (dispatch) => ({
    _handleSignUp: async (secret, address) => {
        const keypair = Keypair.fromSecret(secret);
        const account = keypair.publicKey();

        // const get_url = API_ACCOUNT + 'create_params?account=' + account + '&address=' + address;

        // const getTx = await axios.get(get_url);
        // let tx = getTx.data.data;
        // tx.memo = Buffer.from(tx.memo, 'base64');

        // console.log(tx);
        // sign(tx , secret);

        // tx.memo = tx.memo.toString('base64');
        // tx.signature = tx.signature.toString('base64');

        // const post_url = HOST + 'commit/transaction';

        // const postTx = await axios.post(
        //     post_url,
        //     { tx: tx },
        // );

        // console.log(postTx.data);
        // if(postTx.data.status == 200){
        //     alert('Bạn đã tạo thành công tài khoản ' + address );
        // }
        // else{
        //     alert('Tạo tài khoản thất bại');
        // }
        try{
            const get_url = API_ACCOUNT + 'next_sequence?public_key=' + account;
            const get_sequence = await axios.get(get_url);
            // Check return
            console.log(get_sequence);
            let tx = {
                version: 1,
                account: account,
                sequence: Number.parseInt(get_sequence.data.data.nextSequence),
                memo: Buffer.from('Create account'),
                operation: 'create_account',
                params: {
                    address: address
                },
            }

            //console.log(tx);
            sign(tx , secret);

            // encode transaction
            const txData = '0x' + encode(tx).toString('hex');
            const url = BroadcastTxCommitURL + txData;
            
            const res = await axios.default.get(url)

            if(res.status == 200){
                console.log(res);
                alert('Tạo tài khoản thành công');
            }
            else{
                alert('Tạo tài khoản thất bại');
            }
        
        }
        catch(e){
            console.log(e);
            alert('Có lỗi xảy ra, tạo tài khoản thất bại!');
        }

        
    },
    login: async ( secret ) => {
        try{
            const keypair = Keypair.fromSecret(secret);
            const account = keypair.publicKey();

            const get_url = API_ACCOUNT + 'info?public_key=' + account;

            const getTx = await axios.get(get_url);
            let tx = getTx.data.data;
            console.log(tx);
            let name = Buffer.from(tx.name.data).toString('utf8');
            console.log(name);
            
            if(getTx.status == 200){
                dispatch(updateSecret(secret));
                dispatch(updateUserInfo(tx));
                dispatch(updateUsername(name));
                return true;
            }
            else{
                return false;
            }
        }
        catch(e){
            console.log(e);
            return false;
        }
    }
});

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


export default connect(mapStateToProps, mapDispatchToProps)(Login);