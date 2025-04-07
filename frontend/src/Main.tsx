import React, { useState, useEffect } from 'react';
import App from './App';
import LoginPage from './pages/loginPage';

const Main: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // prüft nur einmal beim Start, ob ein Token existiert
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  return isAuthenticated
  ? <App onLogout={() => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }} />
  : <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;

};

export default Main;
