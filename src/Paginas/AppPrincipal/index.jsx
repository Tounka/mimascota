import { DisplayPrincipalMenu } from '../../ComponentesGenerales/Display.jsx/DisplayPrincipal';
import { Perfil } from '../../ComponentesGenerales/Secciones/Perfil';
import { Menu } from '../../ComponentesGenerales/Secciones/Menu/Menu';
import { Post } from '../../ComponentesGenerales/Secciones/Post';
import { FormularioMascota } from '../../ComponentesGenerales/Secciones/Menu/FormularioMascota';
import { useContext, useEffect, useState } from 'react';
import { ContextoGeneral } from '../../ComponentesGenerales/Contexto/ContextoGeneral';
import { SeleccionarMascota } from '../../ComponentesGenerales/Secciones/Menu/SeleccionarMascota';
import { UsuarioHumano } from '../../ComponentesGenerales/Secciones/Menu/Usuario';


export const AppPrincipal = () => {
  const [seccion, setSeccion] = useState(null);
  const { seccionSeleccionada, setSeccionSeleccionada } = useContext(ContextoGeneral);



  useEffect(() => {
    // Actualizamos la sección mostrada según el valor de seccionSeleccionada
    switch (seccionSeleccionada) {
      case 'inicial':
        setSeccion(<Perfil />);
        break;
      case 'menu':
        setSeccion(<Menu />);
        break;
      case 'post':
        setSeccion(<Post />);
        break;
      case 'agregarMascota':
        setSeccion(<FormularioMascota />);
        break;
      case 'seleccionarMascota':
        setSeccion(<SeleccionarMascota />);
        break;
        case 'usuarioHumano':
            setSeccion(<UsuarioHumano />);
        break;

      default:
        setSeccion(<Menu />); // Valor por defecto
    }
  
  }, [seccionSeleccionada]);

  // Mientras se verifica la autenticación o si no hay sección seleccionada
  if (!seccionSeleccionada) {
    return <div>Cargando...</div>; // Puedes personalizar esto como prefieras
  }

  return (
    <DisplayPrincipalMenu>
      {seccion}
    </DisplayPrincipalMenu>
  );
}

