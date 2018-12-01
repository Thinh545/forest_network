import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';

// Ant Component:
import { Layout, Row, Col } from 'antd';

// Self define component:
import Posts from './components/Posts/index'
import PersonalInfo from './components/LeftSide/PersonalInfo/PersonalInfo'
import Header from './components/NavBar/Header';


const { Content, Sider } = Layout;

const store = createStore(
  rootReducer
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Header className="header" />
          <Content style={{ padding: '0 50px' }}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>

              <Row>
                <Col span={5}>
                  <Sider style={{ background: '#fff' }}>
                    <PersonalInfo />
                  </Sider>
                </Col>
                <Col span={14}>
                  <Content style={{ padding: '40px 30px 20px 30px', minHeight: 280 }}>
                    <Posts />
                  </Content>
                </Col>
                <Col span={5}>

                  <Sider style={{ background: '#fff' }}>
                    Right Sider Content
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
