import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Input, Modal, Button } from 'antd';
import axios from 'axios';
import { updateBlockchainData } from '../../redux/actions/RightSide';
import { API_ACCOUNT, HOST, BroadcastTxCommitURL } from '../../configs/index';
import './blockchain.css';
import {
    Keypair
} from 'stellar-base';

import { sign, encode } from './../../helpers/tx/index'

const { Content } = Layout;

class UserBlockchainInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            secret: '',
            transferPublicKey: '',
            transferAmount: ''
        }
    }

    componentDidMount(){
       this.props.getBlockchainInfo(this.props.secret);
    }

    render() {
        return (
            <Content style={styles.wrapper}>
                <Content style={styles.item}>
                <Icon type="dollar" style={{ marginRight: 10, color: 'orange' }}/>
                    <label className = 'amount'>
                        {' '}{this.props.data && this.props.data.data.balance} 
                    </label>
                    <label className = 'unit'> TRE</label>
                </Content>
                <Content style={styles.item}>
                <Icon type="dot-chart" style={{ marginRight: 10, color: 'blue' }}/>
                    <label className = 'amount'>
                        {' '}{Math.round(this.props.data && this.props.data.data.energy)}
                    </label>
                    <label className = 'unit'> OXY</label>
                </Content>
                <Button
                    type = 'danger'
                    style = {styles.transferMoney}
                    onClick = {() => {this.setState({modalVisible: true})}}
                >
                    Chuyển tiền
                </Button>
                <Modal
                    visible = {this.state.modalVisible}
                    onCancel = {() => {
                        this.setState({modalVisible: false});
                    }}
                    closable = {false}
                    okText = {'Xác nhận'}
                    cancelText = {'Hủy bỏ'}
                    okButtonProps = {{style: {backgroundColor: 'red', borderColor: 'red'}}}
                    onOk = {() => {
                        if(Number.parseInt(this.props.data.data.balance) >= Number.parseInt(this.state.transferAmount)){
                            console.log(this.props.data.data.balance + ' -- ' + this.state.transferAmount)

                            this.props.transferMoney(this.state.secret, this.state.transferPublicKey, this.state.transferAmount);
                            this.setState({modalVisible: false});
                        }
                    }}
                >
                    <Layout style = {styles.transferTitle}>
                        <label className = 'transferTitle'>Giao dịch chuyển tiền</label>
                    </Layout>
                    <Layout style = {styles.inputWrapper}>
                        <Content style = {styles.inputText}>Người gửi</Content>
                        <Input 
                            style = {styles.input}
                            placeholder = 'Nhập secret của bạn'
                            onChange = {(e) => {
                                this.setState({secret: e.target.value})
                            }}
                        />
                    </Layout>
                    <Layout style = {styles.inputWrapper}>
                        <Content style = {styles.inputText}>Người nhận</Content>
                        <Input 
                            style = {styles.input}
                            placeholder = 'Nhập public key của người nhận'
                            onChange = {(e) => {
                                this.setState({transferPublicKey: e.target.value})
                            }}
                        />
                    </Layout>
                    <Layout style = {styles.inputWrapper}>
                        <Content style = {styles.inputText}>Số lượng</Content>
                        <Input 
                            style = {styles.input}
                            placeholder = 'Nhập số tiên muốn chuyển'
                            onChange = {(e) => {
                                this.setState({transferAmount: e.target.value})
                            }}
                        />
                    </Layout>
                    
                    
                    
                </Modal>
            </Content>
        );
    }
}

const styles = {
    wrapper: {
        backgroundColor: 'white',
        minHeight: 280,
        minWidth: 230,
       
    },
    item: {
        flexDirection: 'row'
    },
    transferTitle: {
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: window.innerHeight * 0.02
    },
    transferMoney: {
        borderColor: 'red',
        backgroundColor: 'white',
        color: 'red',
        marginTop: window.innerHeight * 0.02
    },
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    input: {
        flex: 4,
        marginBottom: window.innerHeight * 0.02
    },
    inputText: {
        flex: 1,
        color: 'black'
    }
};


const mapStateToProps = (state) => ({
    data: state['blockchain'].data,
    secret: state['blockchain'].secret
});

const mapDispatchToProps = (dispatch) => ({
    getBlockchainInfo: async (secret) => {
        const keypair = Keypair.fromSecret(secret);
        const account = keypair.publicKey();

        const url = API_ACCOUNT + 'balance?public_key=' + account;
        
        const res = await axios({
            url,
            method: 'GET'
        });
        console.log("AAAAA: " + JSON.stringify(res.data));
        return dispatch(updateBlockchainData(res.data));
    },
    transferMoney: async (secret, address, amount) => {
        const keypair = Keypair.fromSecret(secret);
        const account = keypair.publicKey();

        try{
            const get_url = API_ACCOUNT + 'next_sequence?public_key=' + account;
            const get_sequence = await axios.get(get_url);
            // Check return

            console.log('Sequence: ' + get_sequence.data.data.nextSequence + 1);
            const tx = {
                version: 1,
                account: account,
                sequence: Number.parseInt(get_sequence.data.data.nextSequence),
                memo: Buffer.from('Payment'),
                operation: 'payment',
                params: {
                    address: address,
                    amount: Number.parseInt(amount)
                },
            }

            //console.log(tx);
            sign(tx , secret);

            // encode transaction
            const txData = '0x' + encode(tx).toString('hex');
            const url = BroadcastTxCommitURL + txData;
            
            const res = await axios.default.get(url)

            if(res.status == 200){
                console.log(res.data);
                alert('Chuyển khoản thành công');
            }
            else{
                alert('Chuyển khoản thất bại');
            }
        
        }
        catch(e){
            console.log(e);
            alert('Có lỗi xảy ra, chuyển khoản thất bại!');
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBlockchainInfo);