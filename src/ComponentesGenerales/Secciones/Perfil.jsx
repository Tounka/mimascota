import styled from "styled-components"
import { ContenedorGenerico } from "../Display.jsx/Contenedores"
import { ImgPicture } from "../Generales/Img"
import { TxtGenerico } from "../Generales/Titulos"
import { GridImg } from "../Generales/ContenedorArregloImg"
import { catData } from "../Contexto/DataUsuarioTemporal"
import { useContext } from "react"
import { ContextoGeneral } from "../Contexto/ContextoGeneral"

const ContenedorImg = styled.div`
    width: 80%;
    height: 350px;
    overflow: hidden;
    border-radius: 30% 70% 70% 30% / 30% 20% 80% 70% ;
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

  
 
  
  
export const Perfil = () =>{
    const {mascotaUsuarioSeleccionada, usuario} = useContext(ContextoGeneral);

    const nombre = mascotaUsuarioSeleccionada?.nombre || 'Pancho';
    const raza = mascotaUsuarioSeleccionada?.raza || 'Paco';
    const relacion = mascotaUsuarioSeleccionada?.relacion || 'Amigo de ';
    const img = mascotaUsuarioSeleccionada?.img || 'https://www.whiskas.com.mx/cdn-cgi/image/format=auto,q=90/sites/g/files/fnmzdf4861/files/2022-11/eduquer-son-Chaton-comment-bien-eduquer-son-Chaton.jpg';
    const user = usuario?.displaName || 'Pam';

    const arregloImg = mascotaUsuarioSeleccionada?.catData || catData;
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

            <GridImg catData = {catData} />

        </ContenedorGenerico>
    )
}