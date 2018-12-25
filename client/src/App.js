import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { Route, Switch } from 'react-router-dom';

const store = createStore(
  rootReducer
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component = {Login}/>
      <Route path = '/home' component = {Home}/>
    </Switch>
  </main>
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}

export default App;
