import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextoGeneralProvider } from './ComponentesGenerales/Contexto/ContextoGeneral';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextoGeneralProvider>
        <App />
      </ContextoGeneralProvider>
    </BrowserRouter>
  </React.StrictMode>
);


