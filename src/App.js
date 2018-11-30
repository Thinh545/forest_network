import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Layout, Breadcrumb, Menu, Icon } from 'antd';
import Header from './components/NavBar/Header'
import PersonalInfo from './components/LeftSide/PersonalInfo/PersonalInfo.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';

const { Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;
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
              <Sider width={350} style={{ background: '#fff' }}>
                <PersonalInfo />
              </Sider>
              <Content style={{ padding: '40px 30px 20px 30px', minHeight: 280 }}>
                Content
              </Content>
              <Sider width={350} style={{ background: '#fff' }}>
                Right Sider Content
              </Sider>
            </Layout>
          </Content>
        </Layout>
      </Provider>
    );
  }
}

export default App;
