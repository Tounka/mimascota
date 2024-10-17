import styled from "styled-components"
import { ImgPicture } from "./Img"
const ContenedorGridImg = styled.div`
    width: 90%;
    min-height: 100px;
    max-width: 1200px;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
`

const ContenedorImg = styled.div`
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: lightgray; 
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Mantiene la proporción de la imagen y rellena el contenedor */
    }
`

export const GridImg = ({ arregloImg = [1, 1, 1, 1, 1] }) => {
    return (
        <ContenedorGridImg>
            {arregloImg.map((img, index) => (
                <ContenedorImg key={index}>
                    <ImgPicture src={img} alt='Imagen Grid' />
                </ContenedorImg>
            ))}
        </ContenedorGridImg>
    )
}
