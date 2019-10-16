import React, {Component} from 'react';
import axios from 'axios';
import {Button, Icon, Input, Layout, message} from 'antd';

const {Header, Content} = Layout;

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL,
});

class App extends Component {
  state = {
    status: '',
    name: '',
    password: '',
  };

  componentDidMount() {
    this.checkConnection();
  }

  checkConnection() {
    api.get('me')
      .then(res => this.setState({status: res.data.name}))
      .catch(() => this.setState({status: 'not connected'}));
  }

  connect = e => {
    e.preventDefault();
    const {name, password} = this.state;
    api.post('/login', {name, password})
      .then(() => this.checkConnection())
      .catch(() => message.error('Wrong credentials'))
  };

  onNameChange = e => {
    const name = e.target.value;
    this.setState({name});
  };

  onPasswordChange = e => {
    this.setState({password: e.target.value});
  };

  render() {
    const {status, name, password} = this.state;
    return (
      <Layout className="layout">
        <Header>
          <h1 style={{float: 'left', color: 'white', margin: 0}}>
            <Icon type="deployment-unit" style={{paddingRight: '1rem'}}/>
            Atoms
          </h1>
          <div style={{float: 'right', color: 'white'}}>
            {status}
          </div>
        </Header>
        <Content style={{background: '#fff', padding: 24, minHeight: 280}}>
          <form
            style={{maxWidth: '20rem'}}
            onSubmit={this.connect}
          >
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Username"
              value={name}
              onChange={this.onNameChange}
            />
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.onPasswordChange}
            />
            <Button htmlType="submit" type="primary">Connect</Button>
          </form>
        </Content>
      </Layout>
    );
  }
}

export default App;
