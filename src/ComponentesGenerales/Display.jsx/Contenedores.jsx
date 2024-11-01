import styled from "styled-components"

export const ContenedorGenerico = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    overflow-y: auto;
    gap: 10px;

    
`
export const ContenedorGenericoCentrado = styled(ContenedorGenerico)`
    justify-content: center;
`