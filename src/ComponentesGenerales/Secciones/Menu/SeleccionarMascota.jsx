import styled from "styled-components"

import { usuarioData } from "../../Contexto/DataUsuarioTemporal"
import { ContenedorGenerico } from "../../Display.jsx/Contenedores"
import { TxtGenerico } from "../../Generales/Titulos"
import { ImgPicture } from "../../Generales/Img"
import { useContext } from "react"
import { ContextoGeneral } from "../../Contexto/ContextoGeneral"
import { ContextoFirebase } from "../../Contexto/ContextoFirebase"


const ContenedorImg = styled.div`
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: ${(props) => props.borderRadius} ;
    background-color: var(--ColorVerdePrincipal);
    img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Mantiene la proporción de la imagen y rellena el contenedor */
    }
`

const ContenedorGridMascota = styled.div`
    display: grid;
    grid-template-rows: 150px auto;

    padding: 10px;
    cursor: pointer;
    


`
const ContenedorHorizontal = styled.div`
    display: flex;
    gap: 10px;

    justify-content: center;
    align-items:center;
    flex-wrap: wrap;
`
const ContenedorMascotas = styled(ContenedorHorizontal)`
    gap: 5px;
    display: grid;
    flex-direction: auto auto;

`

const generarBorderRadiusAleatorio = () => {
    const randomValue = () => Math.floor(Math.random() * 40) + 30 + "%";
    return `${randomValue()} ${randomValue()} ${randomValue()} ${randomValue()} / ${randomValue()} ${randomValue()} ${randomValue()} ${randomValue()}`;
};
 
  
  
export const SeleccionarMascota = () =>{
    
    const {usuario,usuarioFirebase} = useContext(ContextoFirebase);
    const {setMascotaUsuarioSeleccionada, setSeccionSeleccionada, misMascotas} = useContext(ContextoGeneral);
 
    const handleClick = (mascota) =>{
        setMascotaUsuarioSeleccionada(mascota);
        setSeccionSeleccionada('inicio');
    }
    return(
        <ContenedorGenerico>
            <TxtGenerico bold size='24px' color='var(--ColorAzulPrincipal)' > Selecciona a nuestro amigo </TxtGenerico>
            <ContenedorHorizontal>
                {misMascotas?.map((mascota, index) =>{
                    const borderRadiusAleatorio = generarBorderRadiusAleatorio();
                    return(
                    
                    <ContenedorGridMascota onClick={() => handleClick(mascota)}>

                        <ContenedorImg borderRadius={borderRadiusAleatorio}>
                            <ImgPicture src={mascota.img} alt={`imagen de ${mascota.nombre}`} />
                        </ContenedorImg>

                        <ContenedorMascotas>
                            <TxtGenerico margin='0' bold size='16px'> {mascota.nombre} </TxtGenerico>
                            <TxtGenerico margin='0' size='16px'> {mascota.raza} </TxtGenerico>

                        </ContenedorMascotas>
                    </ContenedorGridMascota>    
                    )
                })}
            </ContenedorHorizontal>


        </ContenedorGenerico>
    )
}