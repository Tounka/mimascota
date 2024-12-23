import styled from "styled-components"
import { MdPets } from "react-icons/md";
import { useContext, useState } from "react";
import { ContextoGeneral } from "../Contexto/ContextoGeneral";
import { FaPlus,FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
const DisplayPrincipalStyled = styled.div`
    display: grid;
    grid-template-rows:  auto 80px;
    height: 100%;
    width: 100%;
    
`

const DisplayPrincipalNoGridStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    margin-bottom: ${props => props.margin ? '100px' : ''} ;
    position: relative;

   background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='60' height='60' patternTransform='scale(3) rotate(135)'><rect x='0' y='0' width='100%' height='100%' fill='%2389ebd5ff'/><path d='M29.998 26.65v6.693zm-6.837 3.347h3.488zm10.185 0h3.489zm0 0a3.349 3.346 0 01-3.348 3.346 3.349 3.346 0 01-3.349-3.346 3.349 3.346 0 013.349-3.346 3.349 3.346 0 013.348 3.346zm-3.173-6.832c-1.978-.032-3.976.786-5.29 2.287-1.986 2.163-2.275 5.629-.727 8.113 1.45 2.442 4.522 3.736 7.287 3.116 3.067-.607 5.45-3.561 5.392-6.684.045-2.643-1.642-5.173-4.042-6.245a6.489 6.489 0 00-2.62-.587zM59.995 52.87v14.25zm-14.557 7.125h7.428zm21.687 0h7.427zm0 0a7.13 7.124 0 01-7.13 7.124 7.13 7.124 0 01-7.13-7.124 7.13 7.124 0 017.13-7.125 7.13 7.124 0 017.13 7.125zm-6.757-14.547c-4.212-.069-8.465 1.673-11.262 4.869-4.23 4.606-4.845 11.985-1.55 17.274 3.09 5.2 9.628 7.954 15.517 6.635 6.53-1.292 11.604-7.583 11.48-14.231.096-5.628-3.495-11.014-8.606-13.298-1.757-.813-3.665-1.217-5.58-1.249zM-.005 52.87v14.25zm-14.557 7.125h7.428zm21.687 0h7.427zm0 0a7.13 7.124 0 01-7.13 7.124 7.13 7.124 0 01-7.13-7.124 7.13 7.124 0 017.13-7.125 7.13 7.124 0 017.13 7.125zM.368 45.447c-4.212-.069-8.465 1.673-11.262 4.869-4.23 4.606-4.845 11.985-1.55 17.274 3.09 5.2 9.628 7.954 15.517 6.635 6.53-1.292 11.604-7.583 11.48-14.231.096-5.628-3.495-11.014-8.606-13.298-1.757-.813-3.665-1.217-5.58-1.249zM59.995-7.13V7.12zM45.438-.006h7.428zm21.687 0h7.427zm0 0a7.13 7.124 0 01-7.13 7.124 7.13 7.124 0 01-7.13-7.124 7.13 7.124 0 017.13-7.125 7.13 7.124 0 017.13 7.125zm-6.757-14.547c-4.212-.069-8.465 1.673-11.262 4.869C44.876-5.078 44.26 2.3 47.556 7.59c3.09 5.2 9.628 7.954 15.517 6.635 6.53-1.292 11.604-7.583 11.48-14.231.096-5.628-3.495-11.014-8.606-13.298-1.757-.813-3.665-1.217-5.58-1.249zM-.005-7.13V7.12zM-14.562-.006h7.428zm21.687 0h7.427zm0 0a7.13 7.124 0 01-7.13 7.124 7.13 7.124 0 01-7.13-7.124 7.13 7.124 0 017.13-7.125 7.13 7.124 0 017.13 7.125zM.368-14.553c-4.212-.069-8.465 1.673-11.262 4.869-4.23 4.606-4.845 11.985-1.55 17.274 3.09 5.2 9.628 7.954 15.517 6.635 6.53-1.292 11.604-7.583 11.48-14.231.096-5.628-3.495-11.014-8.606-13.298-1.757-.813-3.665-1.217-5.58-1.249z'  stroke-width='2' stroke='%23ffffff53' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-240,-9)' fill='url(%23a)'/></svg>");
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
        height: 70%;
        width: 70%;
    }

`
const Menu = () => {
    const { setSeccionSeleccionada, boolSeccionInicio, setBoolSeccionInicio } = useContext(ContextoGeneral);
    
    const handleClick = ({ seccion, fnEsp }) => {
        setSeccionSeleccionada(seccion);

        if (boolSeccionInicio && fnEsp) {
            setBoolSeccionInicio(false);
        } else {
            setBoolSeccionInicio(true);
        }
    };
    
    return ( 
        <MenuStyled>
            <ContenedoresIconos onClick={() => handleClick({ seccion: 'buscadorSeccion', fnEsp: false })} >
                <FaSearch  size={24} />
            </ContenedoresIconos>
            <ContenedoresIconos onClick={() => handleClick({ seccion: boolSeccionInicio ? 'inicial' : 'formularioPost', fnEsp: true })} > 
                {boolSeccionInicio ? <MdPets /> : <FaPlus />}  
            </ContenedoresIconos>
            <ContenedoresIconos onClick={() => handleClick({ seccion: 'menu', fnEsp: false })} > 
                <TiThMenu /> 
            </ContenedoresIconos>
        </MenuStyled>
    );
};


export const DisplayPrincipalMenu = ({children}) =>{
    return(
        <DisplayPrincipalStyled>
            <ContenedorChidren margin>
                {children}
            </ContenedorChidren>
            <Menu />
        </DisplayPrincipalStyled>
    );
}

export const DisplayPrincipalNoMenu = ({children}) =>{
    return(
        <DisplayPrincipalNoGridStyled>
            <ContenedorChidren >
                {children}
            </ContenedorChidren>
        </DisplayPrincipalNoGridStyled>
    );
}