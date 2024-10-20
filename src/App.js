import { DisplayPrincipal } from './ComponentesGenerales/Display.jsx/DisplayPrincipal';
import './App.css';
import { Perfil } from './ComponentesGenerales/Secciones/Perfil';
import {Menu} from './ComponentesGenerales/Secciones/Menu/Menu'
import { Post } from './ComponentesGenerales/Secciones/Post';
import { useContext, useEffect, useState } from 'react';
import { ContextoGeneral } from './ComponentesGenerales/Contexto/ContextoGeneral';

function App() {
  const [seccion, setSeccion] = useState();
  const {seccionSeleccionada} = useContext(ContextoGeneral)

  useEffect(()=>{
    if(seccionSeleccionada == 'inicial'){
      setSeccion(<Perfil />);
    } else if (seccionSeleccionada == 'menu'){
      
      setSeccion(<Menu />);
    }else if (seccionSeleccionada == 'post'){
      
      setSeccion(<Post />);
    }
    
    console.log(seccionSeleccionada);
  },[seccionSeleccionada])
  return (
    
      <DisplayPrincipal >
        {seccion}
      </DisplayPrincipal>
  
  );
}

export default App;
