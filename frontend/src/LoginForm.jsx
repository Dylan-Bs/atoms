import React from 'react';
import {Button, Icon, Input, message} from 'antd';
import api from './api';

export default class LoginForm extends React.Component {
  state = {
    name: '',
    password: '',
  };

  connect = e => {
    e.preventDefault();
    const {name, password} = this.state;
    api.post('/login', {name, password})
      .then(this.props.onLogin)
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
    const {name, password} = this.state;
    return <form
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
  }
}
