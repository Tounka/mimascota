
import { ContenedorGenerico } from "../../Display.jsx/Contenedores"


import { BuscadorTop } from "./BuscadorTop"
import { GridBottomPrincipal } from "./GridBottom"
import styled from "styled-components"

const ContenedorGridStyled = styled.div`
    display: grid;
    grid-template-rows: 80px auto;

    height: auto;
    width: 100%;
    background-color: white;
    
    

`

  
 
  
  
export const BuscadorSeccion = () =>{



    return(
        <ContenedorGenerico>
            <ContenedorGridStyled>
                <BuscadorTop />
                <GridBottomPrincipal />
            </ContenedorGridStyled>
        </ContenedorGenerico>
    )
}