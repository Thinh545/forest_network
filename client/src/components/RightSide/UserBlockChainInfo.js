import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Input, Row } from 'antd';
import axios from 'axios';
import { updateBlockchainData } from '../../redux/actions/RightSide';
import { API } from '../../configs/index';
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
                    <text className = 'amount'>
                        {' '}{this.props.data && this.props.data.data.amount} 
                    </text>
                    <text className = 'unit'> TRE</text>
                </Content>
                <Content style={styles.item}>
                <Icon type="dot-chart" style={{ marginRight: 10, color: 'blue' }}/>
                    <text className = 'amount'>
                        {' '}{this.props.data && this.props.data.data.bandwidth}
                    </text>
                    <text className = 'unit'> OXY</text>
                </Content>
                <Content style={styles.item}>
                <Icon type="dash" style={{ marginRight: 10 }}/>
                    <text className = 'amount'>
                        {' '}{this.props.data && this.props.data.data.sequence}
                    </text>
                    <text className = 'unit'> SEQUENCE</text>
                </Content>
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
        const url = API + 'account/GDQVHLWFQW3M6H23J2IMRMBK4MHZ5ZF56LJWN7WNXPAMRTL5MQPVCPKL/info?fbclid=IwAR2r4LlqsS_07njc8ZGfgdBlGwriuH0gExN7v2g_NwecdJqKjgO7npOdkBg';
        
        const res = await axios({
            url,
            method: 'GET'
        });
        console.log("AAAAA: " + JSON.stringify(res.data));
        return dispatch(updateBlockchainData(res.data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBlockchainInfo);