import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Input, Row } from 'antd';
import axios from 'axios';
import { updateBlockchainData } from '../../redux/actions/RightSide';
import { API_ACCOUNT } from '../../configs/index';
import './blockchain.css';

const { Content } = Layout;

class UserBlockchainInfo extends Component {
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
                        {' '}{Math.round(this.props.data && this.props.data.data.bandwidth)}
                    </label>
                    <label className = 'unit'> OXY</label>
                </Content>
                {/* <Content style={styles.item}>
                <Icon type="dash" style={{ marginRight: 10 }}/>
                    <label className = 'amount'>
                        {' '}{this.props.data && this.props.data.data.sequence}
                    </label>
                    <label className = 'unit'> SEQUENCE</label>
                </Content> */}
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