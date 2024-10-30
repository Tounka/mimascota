import styled from "styled-components"
import { ContenedorGenerico } from "../Display.jsx/Contenedores"
import { ImgPicture } from "../Generales/Img"
import { TxtGenerico } from "../Generales/Titulos"
import { useContext } from "react"
import { ContextoGeneral } from "../Contexto/ContextoGeneral"
import { ContextoObjSeleccioado } from "../Contexto/ContextoObjSeleccionados"
const ContenedorImg = styled.div`
    width: 100%;
    
    overflow: hidden;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover; 
    }
`

const ContenedorPostStyled = styled.div`
    width: 90%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ContenedorTxt = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;

    padding: 10px;
    background-color: #ffffff5a;
 
`
  
  
export const Post = () =>{
    const {postSeleccionado} = useContext(ContextoGeneral);
   
    console.log(postSeleccionado);

    let titulo = postSeleccionado?.titulo || 'Titulo';
    let img = postSeleccionado?.img || 'https://www.zooplus.es/magazine/wp-content/uploads/2022/01/Psicologia-felina.jpeg';
    let fecha = postSeleccionado?.fecha.toDate() || '12/08/2024';
    let parrafo = postSeleccionado?.parrafo || 'Soy un parrafo'

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
    const anio = fecha.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${anio}`;
    return(
        <ContenedorGenerico>
            <ContenedorPostStyled>
                <TxtGenerico size = '28px' bold > {titulo} </TxtGenerico>
                <ContenedorImg>
                    <ImgPicture fn ='modalImgGrande' src={img}  alt='Imagen principal post' />
                </ContenedorImg>
                <ContenedorTxt>
                    <TxtGenerico size = '18px'  > {parrafo} </TxtGenerico>
                    <TxtGenerico size = '14px'  > {fechaFormateada} </TxtGenerico>
                </ContenedorTxt>


            </ContenedorPostStyled>
        </ContenedorGenerico>
    )
}