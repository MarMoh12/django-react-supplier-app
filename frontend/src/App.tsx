import React from 'react';
import Navbar from './components/navbar';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

interface AppProps {
  onLogout: () => void;
}

const App: React.FC<AppProps> = ({ onLogout }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar onLogout={onLogout} />
      <Header style={{ color: 'white', fontSize: '1.5rem' }}>
        Supplier Evaluation Dashboard
      </Header>
      <Content style={{ padding: '24px' }}>
        <h1>Test</h1>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© 2025 Marcel Mohrmann</Footer>
    </Layout>
  );
};

export default App;
