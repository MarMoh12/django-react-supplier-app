import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import EvaluationPage from './pages/EvaluationPage';
import LoginPage from './pages/LoginPage';
import SupplierPage from './pages/SupplierPage';

const Main: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Beim ersten Laden prüfen, ob ein Token im LocalStorage liegt
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false); // Auth-Status wurde geprüft
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // Während Auth-Status geladen wird, nichts anzeigen
  if (loading) return null;

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          {/* Wenn nicht eingeloggt, nur Login-Route zulassen */}
          <Route path="/login" element={<LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          {/* Layout-Komponente, unter der alle Seiten liegen */}
          <Route path="/" element={<App onLogout={handleLogout} />}>
            <Route index element={<Navigate to="/suppliers" />} />
            <Route path="suppliers" element={<SupplierPage />} />
            <Route path="suppliers/:id/evaluations" element={<EvaluationPage />} />
            <Route path="evaluations" element={<EvaluationPage />} />
            <Route path="*" element={<Navigate to="/suppliers" />} />
          </Route>
        </>
      )}
    </Routes>
  );
};

export default Main;
