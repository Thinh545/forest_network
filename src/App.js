import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './App.css';

import Header from './components/NavBar/Header'
import PersonalInfo from './components/LeftSide/PersonalInfo/PersonalInfo.js';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Header />
    
        <Layout>
          <Sider width = {300} style={{ background: '#fff' }}>
            <PersonalInfo/>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              Content
        </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
