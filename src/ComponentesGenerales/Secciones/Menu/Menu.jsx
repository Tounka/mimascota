import styled from "styled-components"
import { ContenedorGenerico } from "../../Display.jsx/Contenedores"
import { useContext } from "react"
import { ContextoGeneral, ContextoGeneralProvider } from "../../Contexto/ContextoGeneral"

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
const TituloSeccion = styled.div`
    font-size: 18px;
    color: black;
    font-weight: bold;
`
export const SeccionMenu = ({secciones = [1,1,1,1]}) =>{
    const {setSeccionSeleccionada} = useContext(ContextoGeneral);
    
    const handleClick = (id) =>{
        setSeccionSeleccionada(id)
    }
    return(
        <SeccionMenuStyled>
            <TituloSeccion>{secciones[0]}</TituloSeccion>
            {secciones[1].map((seccion, index)=>{
                return(
                    <ItemMenu onClick={() => handleClick(seccion.id) } >
                        {`${seccion.nombre}, '-' ,${seccion.id}`}
                    </ItemMenu>
                )   
            })}
        </SeccionMenuStyled>
    )
}


export const Menu = ({pet}) =>{
    const seccionPerfil = ['Perfil',[{nombre: 'Perfil', id:'usuarioHumano'}, {nombre: 'Mis Mascotas', id: 'seleccionarMascota'}, {nombre: 'Agregar Mascota', id: 'agregarMascota'}]]
    return(
        
            
            <MenuPrincipalStyled>
                <SeccionMenu secciones =  {seccionPerfil} />
                <SeccionMenu secciones =  {seccionPerfil} />
                <SeccionMenu secciones =  {seccionPerfil} />
            </MenuPrincipalStyled>
   
        
    )
}