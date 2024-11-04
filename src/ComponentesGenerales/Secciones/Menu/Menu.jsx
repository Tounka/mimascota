import styled from "styled-components"
import { ContenedorGenerico } from "../../Display.jsx/Contenedores"
import { useContext } from "react"
import { ContextoGeneral, ContextoGeneralProvider } from "../../Contexto/ContextoGeneral"
import { TxtGenerico } from "../../Generales/Titulos"

const MenuPrincipalStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

    background-color: #ffffff5a;

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
    transition: .2s ease;
    &:hover{
        background-color: var(--ColorAzulPrincipal);
        color: white;
        transition: .2s ease;
    }
`
const TituloSeccion = styled.div`
    font-size: 18px;
    color: black;
    font-weight: bold;
    color: var(--ColorAzulPrincipal);
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
                        {`- ${seccion.nombre}`}
                    </ItemMenu>
                )   
            })}
        </SeccionMenuStyled>
    )
}


export const Menu = ({pet}) =>{
    const seccionPerfil = ['Perfil',[{nombre: 'Perfil', id:'usuarioHumano'}, {nombre: 'Mis Mascotas', id: 'seleccionarMascota'}, {nombre: 'Agregar Mascota', id: 'agregarMascota'}]];
    const seccionSocial = ['Social',[{nombre: 'Seguidores', id:'seguidores'}, {nombre: 'Seguidos', id: 'seguidos'}, {nombre: 'Salir', id: 'cerrarSesion'}]];
    return(
        
            
            <MenuPrincipalStyled>
                <TxtGenerico bold size='28px' color={'var(--ColorAzulPrincipal)'} >Menu</TxtGenerico>
                <SeccionMenu secciones =  {seccionPerfil} />
                <SeccionMenu secciones =  {seccionSocial} />
                
            </MenuPrincipalStyled>
   
        
    )
}