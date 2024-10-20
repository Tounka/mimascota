import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextoGeneralProvider } from './ComponentesGenerales/Contexto/ContextoGeneral';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextoGeneralProvider>
      <App />
    </ContextoGeneralProvider>
  </React.StrictMode>
);


