import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';

// Ant Component:
import { Layout, Row, Col, Tabs } from 'antd';

// Self define component:
import Posts from './components/Posts/index'
import PersonalInfo from './components/LeftSide/PersonalInfo/PersonalInfo'
import Follower from './components/Follower/Follower';
import Following from './components/Following/Following';
import Header from './components/NavBar/Header';
import UserBlockChainInfo from './components/RightSide/UserBlockChainInfo';

const { Content, Sider } = Layout;
const TabPane = Tabs.TabPane;

const store = createStore(
  rootReducer
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
