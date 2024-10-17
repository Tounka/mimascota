import styled from "styled-components"
import { MdPets } from "react-icons/md";

const DisplayPrincipalStyled = styled.div`
    display: grid;
    grid-template-rows:  auto 80px;
    height: 100%;
    width: 100%;
    
`

const MenuStyled = styled.div`
    height: 80px;
    width: 100%;
    display:flex;
    padding: 10px;
    justify-content: space-around;
    background-color: var(--ColorNaranjaPrincipal);
    position: fixed;
    bottom: 0;
`
const ContenedorChidren = styled.div`
    height: 100%;
    width: 100%;
    background-color: var(--ColorVerdePrincipal);
    margin-bottom: 100px;
`
const ContenedoresIconos = styled.div`
    height: 100%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: solid 4px white;
    color: white;
    overflow: hidden;
    cursor: pointer;
    svg {
        height: 80%;
        width: 80%;
    }

`
const Menu = () =>{
    return(
        <MenuStyled>
            <ContenedoresIconos>  </ContenedoresIconos>
            <ContenedoresIconos> <MdPets /> </ContenedoresIconos>
            <ContenedoresIconos>  </ContenedoresIconos>
        </MenuStyled>
    )
}

export const DisplayPrincipal = ({children}) =>{
    return(
        <DisplayPrincipalStyled>
            <ContenedorChidren>
                {children}
            </ContenedorChidren>
            <Menu />
        </DisplayPrincipalStyled>
    );
}