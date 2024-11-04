import styled from "styled-components"
import { ContenedorGenerico } from "../../Display.jsx/Contenedores"
import { ImgPicture } from "../../Generales/Img"
import { TxtGenerico } from "../../Generales/Titulos"

import { useContext, useEffect, useState } from "react"
import { ContextoGeneral } from "../../Contexto/ContextoGeneral"
import { BtnGenerico } from "../../Generales/Btns"
import { ContextoFirebase } from "../../Contexto/ContextoFirebase"
import { ContextoObjSeleccioado } from "../../Contexto/ContextoObjSeleccionados"





const ContenedorItems = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;

    
    
`
const ContenedorPrincipal = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    background-color: white;
    
    gap: 10px;

    border-radius: 20px ;
    padding: 20px;

`
const ContenedorItemStyled = styled.div`
    height: 100px;
    width: 100%;
    border-bottom: solid 1px white;
    display: grid;
    grid-template-columns: 80px auto;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    background-color: var(--ColorAzulPrincipal);
    color: white;
    &:hover{
        
    }
    
`
const Txt = styled(TxtGenerico)`
    text-align: start;
`
const ContenedorImg = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
         
    }
`

const Item = ({img, nombre, mascota}) =>{
    const { setSeccionSeleccionada } = useContext(ContextoGeneral);
    const { setPerfilMascotaSeleccionada } = useContext(ContextoObjSeleccioado);
    
    const handleClickItem = () => {
        setPerfilMascotaSeleccionada(mascota);
        setSeccionSeleccionada('perfilOtrasMascotas');
    };
    return(
        <ContenedorItemStyled onClick={() => handleClickItem()}>
            <ContenedorImg>
                <ImgPicture src={img} />
            </ContenedorImg>
            <Txt bold size='20px'> {nombre} </Txt>

        </ContenedorItemStyled>
    )
}
 
  
export const SeguidoresYSeguidos = ({ txt = 'Seguidos', data }) => {
    const { obtenerDocumentoPorArregloIds } = useContext(ContextoFirebase);
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        const fetchMascotas = async () => {
            if (Array.isArray(data) && data.length > 0) {
                const mascotasData = await obtenerDocumentoPorArregloIds('mascotas', data);
                setMascotas(mascotasData);
            }
        };

        fetchMascotas();
    }, [data]);

    return (
        <ContenedorGenerico>
            <ContenedorPrincipal>
                <TxtGenerico color="var(--ColorAzulPrincipal)" size='28px' bold> Usuarios {txt} </TxtGenerico>
                <ContenedorItems>
                    {mascotas.length > 0 ? (
                        mascotas.map((itemData, index) => (
                            <Item key={index} img={itemData.img} nombre={itemData.nombre} mascota={itemData} />
                        ))
                    ) : (
                        <TxtGenerico>No Hay {txt}.</TxtGenerico>
                    )}
                </ContenedorItems>
            </ContenedorPrincipal>
        </ContenedorGenerico>
    );
};