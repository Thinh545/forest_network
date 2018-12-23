import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Tabs } from 'antd';
// Self define component:
import Posts from '../Posts/index';
import PersonalInfo from '../LeftSide/PersonalInfo/PersonalInfo';
import Follower from '../Follower/Follower';
import Following from '../Following/Following';
import Header from '../NavBar/Header';
import UserBlockChainInfo from '../RightSide/UserBlockChainInfo';

const { Content, Sider } = Layout;
const TabPane = Tabs.TabPane;

class Home extends Component{
    render(){
        return (
            <Layout>
                <Header className="header" />
                <Content style={{ padding: '0 50px', marginTop: "5px" }}>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                
                        <Row>
                        <Col span={5}>
                            <Sider style={{ background: '#fff' }}>
                            <PersonalInfo />
                            </Sider>
                        </Col>
                        <Col span={14}>
                            <Tabs defaultActiveKey="1" style={{ padding: '0px 30px 20px 30px', minHeight: 280 }}>
                            <TabPane tab="Posts" key="1">
                                <Posts />
                            </TabPane>
                            <TabPane tab="Following" key="2">
                                <Following/>
                            </TabPane>
                            <TabPane tab="Followers" key="3">
                                <Follower/>
                            </TabPane>
                            </Tabs>
                        </Col>
                        <Col span={5}>
                            <Sider>
                            <UserBlockChainInfo/>
                            </Sider>
                        </Col>
                        </Row>
                    </Layout>
                </Content>
            </Layout>
        )
    }
}

const mapStateToProps = ( state ) => ({

});

const mapDispatchToProps = ( dispatch ) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);