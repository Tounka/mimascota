import styled from "styled-components"
import { ImgPicture } from "./Img"
import { useContext } from "react"
import { ContextoGeneral } from "../Contexto/ContextoGeneral"
const ContenedorGridImg = styled.div`
    width: 90%;
    min-height: 100px;
    max-width: 1200px;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (min-width: 1000px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    gap: 10px;

`

const ContenedorImg = styled.div`
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: lightgray; 
    overflow: hidden;
    
    transition: .15s ease-in-out;
    border-radius: 30% 0 30% 0;
    &:hover{
        transition: .15s ease-in-out;
        border-radius: 20% 0 20% 0;
        cursor: pointer;
        
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover; 
    }
`

export const GridImg = ({post = ['']}) => {
    console.log(post);
    const {setSeccionSeleccionada, setPostSeleccionado} = useContext(ContextoGeneral);
    const handleClick = (card) =>{
        setPostSeleccionado(card);
        setSeccionSeleccionada('post');
    }
    return (
        <ContenedorGridImg>
            {post.map((card, index) => (
                <ContenedorImg key={index} onClick={() => handleClick(card) }>
                    <ImgPicture src={card.img} alt='Imagen Grid' />
                </ContenedorImg>
            ))}
        </ContenedorGridImg>
    )
}
