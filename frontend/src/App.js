import React from 'react';
import {Icon, Layout} from 'antd';

const {Header, Content} = Layout;

const App = () => (
  <Layout className="layout">
    <Header>
      <h1 style={{float: 'left', color: 'white', margin: 0}}>
        <Icon type="deployment-unit" style={{paddingRight: '1rem'}}/>
        Atoms
      </h1>
    </Header>
    <Content style={{background: '#fff', padding: 24, minHeight: 280}}>
      content
    </Content>
  </Layout>
);

export default App;
