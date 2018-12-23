import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Input, Modal, Button } from 'antd';
import axios from 'axios';
import { updateBlockchainData } from '../../redux/actions/RightSide';
import { API_ACCOUNT } from '../../configs/index';
import './blockchain.css';

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
       this.props.getBlockchainInfo();
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
                        if(this.props.data.data.balance >= this.state.transferAmount){
                            console.log('Transfer accepter');
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
    data: state['blockchain'].data
});

const mapDispatchToProps = (dispatch) => ({
    getBlockchainInfo: async () => {
        const url = API_ACCOUNT + 'balance?public_key=GDQVHLWFQW3M6H23J2IMRMBK4MHZ5ZF56LJWN7WNXPAMRTL5MQPVCPKL';
        
        const res = await axios({
            url,
            method: 'GET'
        });
        console.log("AAAAA: " + JSON.stringify(res.data));
        return dispatch(updateBlockchainData(res.data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBlockchainInfo);