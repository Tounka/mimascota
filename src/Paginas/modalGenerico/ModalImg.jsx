import styled from "styled-components";
import { ImgPicture } from "../../ComponentesGenerales/Generales/Img";
import { useContext } from "react";
import { ContextoGeneral } from "../../ComponentesGenerales/Contexto/ContextoGeneral";
const ContenedorImg = styled.div`
    width: auto;
    height: auto;
    padding: 10px;
    background-color: white;

    

    img {
        width: 100%;
        height: 100%;
        object-fit: contain; 
    }
`

export const ContenidoModalImg = ({src, alt}) =>{

    return(
        <ContenedorImg>
            <ImgPicture src={src} alt={alt} />
        </ContenedorImg>
    )
}
