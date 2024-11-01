import { useContext } from "react"
import styled from "styled-components"
import { ContextoObjSeleccioado } from "../Contexto/ContextoObjSeleccionados"
import { ContextoGeneral } from "../Contexto/ContextoGeneral"
export const BtnGenerico = styled.button `
    width: ${props => props.width ? props.width : '120px'} ;
    height: ${props => props.height ? props.height : '60px'} ;
    color: ${props => props.color ? props.color : ''};
    background-color: ${props => props.bgColor ? props.bgColor : ''};
    padding: 10px;
    font-size: 22px;
    font-weight: bold;
    border-radius: 10px;
    border: none;

    cursor: pointer;
    display: flex;
    justify-content:center;
    align-items: center;
    gap: 10px;
`

export const BtnSeguirStyled = styled.button`
    width: 80px ;
    height: 40px ;
    color: ${props => props.seguido ? 'white' : 'var(--ColorAzulPrincipal)'};
    background-color: ${props => props.seguido ? 'var(--ColorAzulPrincipal)': 'white'};
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 10px;
    border: none;

    cursor: pointer;
    display: flex;
    justify-content:center;
    align-items: center;
    gap: 10px;
`

export const BtnSeguir = ({seguido}) =>{
    const { perfilMascotaSeleccionada } = useContext(ContextoObjSeleccioado);
    const {usuarioFirebase} = useContext(ContextoGeneral);
    const handleClick = () =>{
        if(seguido == true){
            console.log('adios')
        }else if(seguido == false)
        {
            console.log('hola')
        }
    }
    return(
        <BtnSeguirStyled seguido={seguido} onClick={() => handleClick()} >
            {seguido ? 'Dejar de seguir' : 'Seguir'}
        </BtnSeguirStyled>
    )
}