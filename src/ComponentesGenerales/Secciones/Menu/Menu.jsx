import styled from "styled-components"
import { ContenedorGenerico } from "../../Display.jsx/Contenedores"

const MenuPrincipalStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;

    background-color: var(--ColorVerdePrincipal);

`
const SeccionMenuStyled = styled.div`
    border-bottom: 2px solid black ;
    display: flex;
    
    padding-bottom: 10px;
    flex-direction: column;
` 
const ItemMenu = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: black;
    padding: 10px;
    cursor: pointer;
    user-select: none;
    &:hover{
        background-color: white;
    }
`

export const SeccionMenu = ({secciones = [1,1,1,1]}) =>{
    return(
        <SeccionMenuStyled>
            {secciones.map((seccion, index)=>{
                return(
                    <ItemMenu>
                        {`${seccion}, '-' ,${index}`}
                    </ItemMenu>
                )   
            })}
        </SeccionMenuStyled>
    )
}


export const Menu = ({pet}) =>{

    return(
        
            
            <MenuPrincipalStyled>
                <SeccionMenu />
                <SeccionMenu />
                <SeccionMenu />
            </MenuPrincipalStyled>
   
        
    )
}