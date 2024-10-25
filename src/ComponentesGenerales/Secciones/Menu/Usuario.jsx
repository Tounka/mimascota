import styled from "styled-components"
import { ContenedorGenerico } from "../../Display.jsx/Contenedores"
import { ImgPicture } from "../../Generales/Img"
import { TxtGenerico } from "../../Generales/Titulos"

import { useContext } from "react"
import { ContextoGeneral } from "../../Contexto/ContextoGeneral"
import { BtnGenerico } from "../../Generales/Btns"
import { ContextoFirebase } from "../../Contexto/ContextoFirebase"

const ContenedorImg = styled.div`
    width: 250px;
    height: 250px;
    overflow: hidden;
    border-radius: 50% ;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Mantiene la proporción de la imagen y rellena el contenedor */
    }
`
const ContenedorHorizontal = styled.div`
    display: flex;
    gap: 5px;
`


  
 
  
  
export const UsuarioHumano = () =>{
    const {usuarioFirebase, usuario, cerrarSesion} = useContext(ContextoFirebase);

    const nombre = usuarioFirebase?.nombre || 'Error';
    const apellido = usuarioFirebase?.apellido || 'Error';
    const userName = usuarioFirebase?.userName || 'Error';
    const img = usuarioFirebase?.photoURL || 'https://www.whiskas.com.mx/cdn-cgi/image/format=auto,q=90/sites/g/files/fnmzdf4861/files/2022-11/eduquer-son-Chaton-comment-bien-eduquer-son-Chaton.jpg';
    const email = usuario?.email || 'Error';

    const handleClickCerrarSesion = () =>{
        cerrarSesion();
    }

    return(
        <ContenedorGenerico>
            <TxtGenerico size = '28px' bold > {userName} </TxtGenerico>
            <ContenedorImg>
                <ImgPicture alt='Img Perfil' src={img} />
            </ContenedorImg>
            <ContenedorHorizontal>
            <TxtGenerico size = '16px' bold > {nombre} {apellido}  </TxtGenerico>
          

            </ContenedorHorizontal>
            <TxtGenerico size = '16px' bold > {email} </TxtGenerico>
      

            <BtnGenerico onClick={() => handleClickCerrarSesion()} bgColor= 'var(--ColorRojoPrincipal)' color='white' > Salir </BtnGenerico>


        </ContenedorGenerico>
    )
}