import { DisplayPrincipal } from './ComponentesGenerales/Display.jsx/DisplayPrincipal';
import './App.css';
import { Perfil } from './ComponentesGenerales/Secciones/Perfil';
import {Menu} from './ComponentesGenerales/Secciones/Menu/Menu'
import { Post } from './ComponentesGenerales/Secciones/Post';
import { FormularioMascota } from './ComponentesGenerales/Secciones/Menu/FormularioMascota';
import { useContext, useEffect, useState } from 'react';
import { ContextoGeneral } from './ComponentesGenerales/Contexto/ContextoGeneral';
import { SeleccionarMascota } from './ComponentesGenerales/Secciones/Menu/SeleccionarMascota';

function App() {
  const [seccion, setSeccion] = useState();
  const {seccionSeleccionada} = useContext(ContextoGeneral)

  useEffect(()=>{
    switch (seccionSeleccionada) {
      case "inicial":
        setSeccion(<Perfil />);
        break;
      case "menu":
        setSeccion(<Menu />);
        break;
      case "post":
        setSeccion(<Post />);
        break;
      case "agregarMascota":
        setSeccion(<FormularioMascota />);
        break;
      case "seleccionarMascota":
        setSeccion(<SeleccionarMascota />);
        break;
      case "btn3":
        setSeccion(<SeleccionarMascota />);
        break;


      default:
        setSeccion(<Menu />);
    }


    //logica para btn regresar

    console.log(seccionSeleccionada);
  },[seccionSeleccionada])
  return (
    
      <DisplayPrincipal >
        {seccion}
      </DisplayPrincipal>
  
  );
}

export default App;
