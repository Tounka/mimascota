import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { ContextoFirebase } from "../../Contexto/ContextoFirebase";
import { ImgPicture } from "../../Generales/Img";
import { TxtGenerico } from "../../Generales/Titulos";
import { ContextoObjSeleccioado } from "../../Contexto/ContextoObjSeleccionados";
import { ContextoGeneral } from "../../Contexto/ContextoGeneral";
const ContenedorStyled = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 40px auto;
    align-items: center;
    padding: 10px 20px;
    gap: 10px;
    border-bottom: solid 2px var(--ColorVerdePrincipal);
    position: relative;
`;

const IconoBusqueda = styled.button`
    color: #888;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: none;
    border: none;
`;

const InputBusqueda = styled.input`
    border: none;
    outline: none;
    height: 100%;
    width: 100%;
    font-size: 1em;
    padding: 5px;
    background: none;
    color: #333;

    &::placeholder {
        color: #888;
    }
`;

// Contenedor para los resultados de búsqueda
const ResultadosContenedor = styled.div`
    position: absolute;
    bottom: -45px;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
`;

const ContenedorResultadoItemStyled = styled.div`
    padding: 10px;
    height: 60px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 20px;
    &:hover {
        background-color: #f0f0f0;
    }
`;
const ContenedorImg = styled.div`
    height: 50px;
    width: 50px;

    & img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`

const ResultadoItem = ({resultado}) => {
    const { setSeccionSeleccionada } = useContext(ContextoGeneral);
    const { setPerfilMascotaSeleccionada } = useContext(ContextoObjSeleccioado);
    const handleClickItem = (item) =>{
        setPerfilMascotaSeleccionada(item);
        console.log(item, 'item')
        setSeccionSeleccionada('perfilOtrasMascotas');
    }
    return(
        <ContenedorResultadoItemStyled onClick = {() => handleClickItem(resultado)}  >
            <ContenedorImg>
                <ImgPicture src={resultado.img} alt={`Imagen de perfil de ${resultado.nombre}`} />
            </ContenedorImg>
            <TxtGenerico> {resultado.nombre} - {resultado.especie} </TxtGenerico>
        </ContenedorResultadoItemStyled>
    )
}


export const BuscadorTop = () => {
    const [query, setQuery] = useState("");
    const [resultados, setResultados] = useState([]);
    const { obtenerMascotasSearch } = useContext(ContextoFirebase);


    const handleSearch = async () => {
        if (query.trim() === "") {
            setResultados([]);
            return;
        }
        
        try {
            const mascotas = await obtenerMascotasSearch(query);
            const resultadosPrueba = mascotas;
            setResultados(resultadosPrueba);
        } catch (error) {
            console.error("Error al buscar mascotas:", error);
            setResultados([]);
        }
    };



    // Detecta "Enter" y ejecuta la búsqueda
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <ContenedorStyled>
            <IconoBusqueda onClick={handleSearch} aria-label="Buscar">
                <FaSearch />
            </IconoBusqueda>
            <InputBusqueda 
                id="buscador" 
                type="text" 
                placeholder="Escribe aquí..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            
            {resultados.length > 0 ? (
                <ResultadosContenedor>
                    {resultados.map((resultado) => (
                        <ResultadoItem resultado={resultado} key={resultado.id} />
                    ))}
                </ResultadosContenedor>
            ) : query && (
                <ResultadosContenedor>
                    <ContenedorResultadoItemStyled>
                        <TxtGenerico>No se encontraron resultados.</TxtGenerico>
                    </ContenedorResultadoItemStyled>
                </ResultadosContenedor>
            )}
        </ContenedorStyled>
    );
};