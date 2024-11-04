import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ContextoFirebase } from "../../Contexto/ContextoFirebase";
import { ImgPicture } from "../../Generales/Img";
import { ContextoGeneral } from "../../Contexto/ContextoGeneral";
import { ContextoObjSeleccioado } from "../../Contexto/ContextoObjSeleccionados";

const imagenes = [1, 1, 1, 1, 1, 1, 1, 1];

const ContenedorGridStyled = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    padding: 10px;
    overflow: auto;
    object-fit: contain;
`;

const ContenedorFila = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    gap: 10px;
`;

const ContenedorImg = styled.div`
    width: 100%;
    height: auto;
    background-color: var(--ColorVerdePrincipal);
    cursor: pointer;
    overflow: hidden; /* Asegúrate de que el contenedor no muestre el desbordamiento */

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease; /* Agrega transición para suavizar el efecto */
    }

    &:hover img {
        transform: scale(1.1); /* Aplica el zoom al pasar el ratón */
    }
`;

export const GridBottomPrincipal = () => {
    const { obtenerPostGeneral } = useContext(ContextoFirebase);
    const {setSeccionSeleccionada, setPostSeleccionado, setBoolSeccionInicio} = useContext(ContextoGeneral);
    const {setModalSeleccionado} = useContext(ContextoObjSeleccioado);
    const [posts, setPosts] = useState([]); 
    const columnas = [[], [], []];

    const handleClick = (card) =>{
        setPostSeleccionado(card);
        setSeccionSeleccionada('post');
        setBoolSeccionInicio(true);
        setModalSeleccionado(['imgGrandeModal', card.img])

    }
    useEffect(() => {
        const fetchPosts = async () => {
            const data = await obtenerPostGeneral();
            setPosts(data || []);
        };

        fetchPosts();
    }, [obtenerPostGeneral]);


    posts.forEach((post, index) => {
        
        const columnaIndex = index % 3;
        columnas[columnaIndex].push(
            <ContenedorImg key={index} onClick={() => handleClick(post)}>
                <ImgPicture src={post.img} alt='post grid'  />
            </ContenedorImg>
        );
    });

    return (
        <ContenedorGridStyled>
            {columnas.map((columna, index) => (
                <ContenedorFila  key={index}>
                    {columna}
                </ContenedorFila>
            ))}
        </ContenedorGridStyled>
    );
};
