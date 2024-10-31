import styled from "styled-components";

const imagenes = [1, 1, 1, 1, 1, 1, 1, 1];

const ContenedorGridStyled = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    padding: 10px;
    overflow: auto;
`;

const ContenedorFila = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    gap: 10px;
`;

const ContenedorImg = styled.div`
    width: 100%;
    height: 200px;
    
    background-color: red;
`;

export const GridBottomPrincipal = () => {
    const columnas = [[], [], []];

    imagenes.forEach((img, index) => {
        const columnaIndex = index % 3;
        columnas[columnaIndex].push(
            <ContenedorImg key={index} />
        );
    });

    return (
        <ContenedorGridStyled>
            {columnas.map((columna, index) => (
                <ContenedorFila key={index}>
                    {columna}
                </ContenedorFila>
            ))}
        </ContenedorGridStyled>
    );
};
