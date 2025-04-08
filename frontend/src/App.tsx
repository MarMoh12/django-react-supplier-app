import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

interface AppProps {
  onLogout: () => void;
}

const App: React.FC<AppProps> = ({ onLogout }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Navigationsleiste oben */}
      <Navbar onLogout={onLogout} />

      {/* Seitenüberschrift */}
      <Header style={{ color: 'white', fontSize: '1.5rem', background: '#001529' }}>
        Supplier Evaluation Dashboard
      </Header>

      {/* Hauptinhalt */}
      <Content style={{ padding: '24px' }}>
        <Outlet />
      </Content>

      {/* Footer unten */}
      <Footer style={{ textAlign: 'center' }}>
        © 2025 Marcel Mohrmann
      </Footer>
    </Layout>
  );
};

export default App;
