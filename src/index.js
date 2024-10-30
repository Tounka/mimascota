import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextoGeneralProvider } from './ComponentesGenerales/Contexto/ContextoGeneral';
import { ContextoFirebaseProvider } from './ComponentesGenerales/Contexto/ContextoFirebase';
import { ContextoObjSeleccioadoProvider } from './ComponentesGenerales/Contexto/ContextoObjSeleccionados'; 
import { BrowserRouter } from 'react-router-dom';
import ModalGenerico from './Paginas/modalGenerico';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextoGeneralProvider>
        <ContextoObjSeleccioadoProvider>
          <ContextoFirebaseProvider>
            <App />
            <ModalGenerico />
          </ContextoFirebaseProvider>
        </ContextoObjSeleccioadoProvider>
      </ContextoGeneralProvider>
    </BrowserRouter>
  </React.StrictMode>
);


