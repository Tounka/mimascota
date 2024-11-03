import { DisplayPrincipalMenu } from '../../ComponentesGenerales/Display.jsx/DisplayPrincipal';
import { Perfil } from '../../ComponentesGenerales/Secciones/Perfil';
import { Menu } from '../../ComponentesGenerales/Secciones/Menu/Menu';
import { Post } from '../../ComponentesGenerales/Secciones/Post';
import { FormularioMascota } from '../../ComponentesGenerales/Secciones/Menu/FormularioMascota';
import { useContext, useEffect, useState } from 'react';
import { ContextoGeneral } from '../../ComponentesGenerales/Contexto/ContextoGeneral';
import { SeleccionarMascota } from '../../ComponentesGenerales/Secciones/Menu/SeleccionarMascota';
import { UsuarioHumano } from '../../ComponentesGenerales/Secciones/Menu/Usuario';
import { ContextoFirebase } from '../../ComponentesGenerales/Contexto/ContextoFirebase';
import { useNavigate } from 'react-router-dom';
import { FormularioPost } from '../../ComponentesGenerales/Secciones/Menu/FormularioPost';
import { BuscadorSeccion } from '../../ComponentesGenerales/Secciones/SeccionBuscador';
import { PerfilOtrasMascotas } from '../../ComponentesGenerales/Secciones/Perfil';
import { SeguidoresYSeguidos } from '../../ComponentesGenerales/Secciones/Menu/SeguidoresYSeguidos';
export const AppPrincipal = () => {
  const [seccion, setSeccion] = useState(null);
  const { seccionSeleccionada, setMisMascotas,setMascotaUsuarioSeleccionada, mascotaUsuarioSeleccionada } = useContext(ContextoGeneral);
  const {usuarioFirebase,cerrarSesion, obtenerMisMascotas} = useContext(ContextoFirebase); 
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMascotas = async () => {
        if (usuarioFirebase) {
            const mascotas = await obtenerMisMascotas(usuarioFirebase?.uid);
            setMisMascotas(mascotas);
            if(mascotas.length >= 0){
              setMascotaUsuarioSeleccionada(mascotas[0]);
            }
        }
    };


    fetchMascotas();
}, [usuarioFirebase ]);
useEffect(() => {
  if (usuarioFirebase == null || usuarioFirebase == undefined) {
      navigate('/iniciarSesion');
  } else if (usuarioFirebase?.mascotas?.length === 0) {
      setSeccion(<FormularioMascota />);
  } else if (usuarioFirebase?.mascotas != null) {
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
          case 'formularioPost':
              setSeccion(<FormularioPost />);
              break;
          case 'buscadorSeccion':
              setSeccion(<BuscadorSeccion />);
              break;
          case 'perfilOtrasMascotas':
              setSeccion(<PerfilOtrasMascotas />);
              break;
            case 'seguidores':
                setSeccion(<SeguidoresYSeguidos data={mascotaUsuarioSeleccionada.seguidores} txt={'Seguidores'} />);
            break;
            case 'seguidos':
                setSeccion(<SeguidoresYSeguidos data={mascotaUsuarioSeleccionada.seguidos} txt={'Seguidos'} />);
            break;
          case 'cerrarSesion':
              cerrarSesion();
              break;
          default:
              setSeccion(<Perfil />);
      }
  }
}, [seccionSeleccionada, usuarioFirebase]);

  if (!seccionSeleccionada) {
    return <div>Cargando...</div>; 
  }

  return (
    <DisplayPrincipalMenu margin>
      {seccion}
    </DisplayPrincipalMenu>
  );
}

