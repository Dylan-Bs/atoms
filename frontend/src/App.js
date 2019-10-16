import React, {Component} from 'react';
import {Icon, Layout, Button, message} from 'antd';
import api from './api';
import LoginForm from './LoginForm';

const {Header, Content} = Layout;

class App extends Component {
  state = {
    name: '',
    loggedIn: false,
  };

  componentDidMount() {
    this.checkConnection();
  }

  checkConnection = () => {
    api.get('me')
      .then(res => this.setState({name: res.data.name, loggedIn: true}))
      .catch(() => this.setState({loggedIn: false}));
  };

  logout = () => {
    api.post('/logout')
        .then(this.checkConnection)
        .catch(() => message.error("Wrong credentials"))
  };

  render() {
    const {name, loggedIn} = this.state;
    return (
      <Layout className="layout">
        <Header>
          <h1 style={{float: 'left', color: 'white', margin: 0}}>
            <Icon type="deployment-unit" style={{paddingRight: '1rem'}}/>
            Atoms
          </h1>
          <div style={{float: 'right', color: 'white'}}>
            {(loggedIn && name) || 'not connected'}
            {loggedIn && <Button type="danger" onClick={this.logout} style={{marginLeft:"10px"}}>Log Out</Button>}
          </div>
        </Header>
        <Content style={{background: '#fff', padding: 24, minHeight: 280}}>
          {!loggedIn && <LoginForm onLogin={this.checkConnection} />}
        </Content>
      </Layout>
    );
  }
}

export default App;
