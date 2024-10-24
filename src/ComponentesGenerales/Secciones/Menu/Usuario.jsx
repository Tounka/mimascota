import styled from "styled-components"
import { ContenedorGenerico } from "../../Display.jsx/Contenedores"
import { ImgPicture } from "../../Generales/Img"
import { TxtGenerico } from "../../Generales/Titulos"

import { useContext } from "react"
import { ContextoGeneral } from "../../Contexto/ContextoGeneral"

const ContenedorImg = styled.div`
    height: 350px;
    height: 350px;
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
    const {usuario} = useContext(ContextoGeneral);

    const nombre = usuario?.nombre || 'Pancho';
    const raza = usuario?.raza || 'Paco';
    const relacion = usuario?.relacion || 'Amigo de ';
    const img = usuario?.img || 'https://www.whiskas.com.mx/cdn-cgi/image/format=auto,q=90/sites/g/files/fnmzdf4861/files/2022-11/eduquer-son-Chaton-comment-bien-eduquer-son-Chaton.jpg';
    const user = usuario?.user || 'Pam';


    return(
        <ContenedorGenerico>
            <TxtGenerico size = '28px' bold > {nombre} </TxtGenerico>
            <ContenedorImg>
                <ImgPicture alt='Img Perfil' src={img} />
            </ContenedorImg>
            <TxtGenerico size = '16px' bold > {raza} </TxtGenerico>

            <ContenedorHorizontal>
                <TxtGenerico size = '16px' bold > {relacion} </TxtGenerico>
                <TxtGenerico size = '16px'  > {user} </TxtGenerico>
            </ContenedorHorizontal>



        </ContenedorGenerico>
    )
}