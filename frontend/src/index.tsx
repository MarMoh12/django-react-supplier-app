import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
