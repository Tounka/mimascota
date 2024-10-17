import styled from "styled-components"
import { ContenedorGenerico } from "../Display.jsx/Contenedores"
import { ImgPicture } from "../Generales/Img"
import { TxtGenerico } from "../Generales/Titulos"
import { GridImg } from "../Generales/ContenedorArregloImg"
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
const catImages = [
    "https://static.nationalgeographic.es/files/styles/image_3200/public/01-cat-names-nationalgeographic_1525054.jpg?w=1600&h=900",
    "https://www.purina.es/sites/default/files/2021-12/Temperatura%20corporal%20de%20los%20gatos_teaser_0.jpg",
    "https://greentology.life/wp-content/uploads/2023/11/gatos_adorable-gatito-gafas-sol.jpg",
    "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97"
  ];
  
export const Perfil = ({pet}) =>{
    const nombre = pet?.nombre || 'Pancho';
    const raza = pet?.raza || 'Paco';
    const relacion = pet?.relacion || 'Amigo de ';
    const user = pet?.user || 'Pam';
    const arregloImg = pet?.arregloImg || catImages;
    return(
        <ContenedorGenerico>
            <TxtGenerico size = '28px' bold > {nombre} </TxtGenerico>
            <ContenedorImg>
                <ImgPicture alt='Img Perfil' src='https://www.whiskas.com.mx/cdn-cgi/image/format=auto,q=90/sites/g/files/fnmzdf4861/files/2022-11/eduquer-son-Chaton-comment-bien-eduquer-son-Chaton.jpg'/>
            </ContenedorImg>
            <TxtGenerico size = '16px' bold > {raza} </TxtGenerico>

            <ContenedorHorizontal>
                <TxtGenerico size = '16px' bold > {relacion} </TxtGenerico>
                <TxtGenerico size = '16px'  > {user} </TxtGenerico>
            </ContenedorHorizontal>

            <GridImg arregloImg = {arregloImg} />

        </ContenedorGenerico>
    )
}