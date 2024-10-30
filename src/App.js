
import { useContext, useState } from 'react';
import { DisplayPrincipalNoMenu } from './ComponentesGenerales/Display.jsx/DisplayPrincipal';
import { ContextoGeneral } from './ComponentesGenerales/Contexto/ContextoGeneral';

import { AppPrincipal } from './Paginas/AppPrincipal';
import { IniciarSesion } from './Paginas/IniciarSesion';

import { Route, Routes } from 'react-router-dom';
function App() {
  const [seccion, setSeccion] = useState(null);
  const { seccionSeleccionada, setSeccionSeleccionada } = useContext(ContextoGeneral);



  return (
    <DisplayPrincipalNoMenu>
      <Routes>
          <Route path = '/iniciarsesion' element = {<IniciarSesion />} default />
          <Route path = '/' element = {<AppPrincipal />}  />
          
      </Routes>

    </DisplayPrincipalNoMenu>
  );
}

export default App;
