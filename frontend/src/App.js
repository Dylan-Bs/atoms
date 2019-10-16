import React, {Component} from 'react';
import axios from 'axios';
import {Icon, Layout} from 'antd';

const {Header, Content} = Layout;

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL,
});

class App extends Component {
  state = {
    status: ''
  };

  componentDidMount() {
    this.checkConnection();
  }

  checkConnection() {
    api.get('me')
      .then(res => this.setState({status: res.data.name}))
      .catch(err => this.setState({status: 'not connected'}));
  }

  render() {
    const {status} = this.state;
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
          content
        </Content>
      </Layout>
    );
  }
}

export default App;
