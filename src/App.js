import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';

// Ant Component:
import { Layout, Breadcrumb, Menu, Icon } from 'antd';

// Self define component:
import Posts from './components/Posts/index'
import PersonalInfo from './components/LeftSide/PersonalInfo/PersonalInfo'
import Header from './components/NavBar/Header';


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
              <Sider width={400} style={{ background: '#fff' }}>
                <PersonalInfo />
              </Sider>
              <Content style={{ padding: '40px 30px 20px 30px', minHeight: 280 }}>
                <Posts/>
              </Content>
              <Sider width={400} style={{ background: '#fff' }}>
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
