import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const ContenedorStyled = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 40px auto;
    align-items: center;
    padding: 10px 20px;
    gap: 10px;

    border-bottom: solid 2px var(--ColorVerdePrincipal);
`;

const IconoBusqueda = styled.label`
    color: #888;
    font-size: 24px;
    margin-right: 8px;
    display: flex;
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;
    cursor: pointer;
    
`;

const InputBusqueda = styled.input`
    border: none;
    outline: none;
    width: 100%;
    font-size: 1em;
    padding: 5px;
    background: none;

    color: #333;
    
    &::placeholder {
        color: #888;
    }
`;



export const BuscadorTop = () => {
    return (
        <ContenedorStyled>
            
            <IconoBusqueda htmlFor="buscador"> <FaSearch /> </IconoBusqueda>
            <InputBusqueda 
                id="buscador" 
                type="text" 
                placeholder="Escribe aquí..." 
            />
        </ContenedorStyled>
    );
};
