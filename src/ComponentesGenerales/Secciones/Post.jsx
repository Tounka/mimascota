import styled from "styled-components"
import { ContenedorGenerico } from "../Display.jsx/Contenedores"
import { ImgPicture } from "../Generales/Img"
import { TxtGenerico } from "../Generales/Titulos"
import { useContext, useEffect, useState } from "react"
import { ContextoGeneral } from "../Contexto/ContextoGeneral"
import { ContextoObjSeleccioado } from "../Contexto/ContextoObjSeleccionados"
import { ContextoFirebase } from "../Contexto/ContextoFirebase"
const ContenedorImg = styled.div`
    width: 100%;
    
    overflow: hidden;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover; 
    }
`

const ContenedorPostStyled = styled.div`
    width: 90%;
    max-width: 500px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ContenedorTxt = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 10px;
    background-color: #ffffff5a;
 
`
const ContenedorOwnerPostStyled = styled.div`
    height: 80px;
    width: 220px; 
    display: grid;
    grid-template-columns: 80px auto;
    gap: 10px;

    border-radius: 10px;
    overflow: hidden;
    background-color: var(--ColorVerdePrincipal);
    cursor: pointer;
`
const ContenedorImgOwner = styled.div`
    width: 100%;
    height: 100%;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const ContenedorTxtOwner = styled.div`
    width: 100%;
    height: 100%;
    gap: 5px;
    justify-content: center;
    display: flex;
    flex-direction: column;

    p{
        text-shadow: 4px 4px 7px rgba(255, 255, 255, 0.42);
    }

`

const ContenedorOwnerPost = ({ id }) => {
    const { setSeccionSeleccionada } = useContext(ContextoGeneral);
    const { setPerfilMascotaSeleccionada } = useContext(ContextoObjSeleccioado);
    const { ObtenerDocumentoFirestore } = useContext(ContextoFirebase);
    const [ownerData, setOwnerData] = useState(null);

    const handleClick = () =>{
        setPerfilMascotaSeleccionada(ownerData);
        setSeccionSeleccionada('perfilOtrasMascotas');
        console.log('jola')
        
    }

    

    useEffect(() => {
        const fetchOwnerData = async () => {
            const data = await ObtenerDocumentoFirestore('mascotas',id);
            setOwnerData(data);
        };

        fetchOwnerData();
    }, [id, ObtenerDocumentoFirestore]);

    return (
        <ContenedorOwnerPostStyled onClick={() => handleClick()}>
            {ownerData ? (
            <>
                <ContenedorImgOwner>
                        <ImgPicture src={ownerData.img} alt={`Imagen de usuario ${ownerData.nombre}`} />
                </ContenedorImgOwner>
                <ContenedorTxtOwner>
                    <TxtGenerico align='start' color="var(--ColorAzulPrincipal)" margin='0px' bold size='16px;' >{`${ownerData.nombre} ${ownerData.raza} `} </TxtGenerico>
                    <TxtGenerico align='start' color="var(--ColorAzulPrincipal)" margin='0px' size='14px;' > Visitar perfil </TxtGenerico>
                </ContenedorTxtOwner>
            </>
                ) : (
                    <></>
                )}
        </ContenedorOwnerPostStyled>
    );
};

  
  
export const Post = () =>{
    const {postSeleccionado} = useContext(ContextoGeneral);
    console.log(postSeleccionado.mascotaId)
    let titulo = postSeleccionado?.titulo || 'Titulo';
    let img = postSeleccionado?.img || 'https://www.zooplus.es/magazine/wp-content/uploads/2022/01/Psicologia-felina.jpeg';
    let fecha = postSeleccionado?.fecha.toDate() || '12/08/2024';
    let parrafo = postSeleccionado?.parrafo || 'Soy un parrafo'

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
    const anio = fecha.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${anio}`;
    return(
        <ContenedorGenerico>
            <ContenedorPostStyled>
                <TxtGenerico size = '28px' bold > {titulo} </TxtGenerico>
                <ContenedorImg>
                    <ImgPicture fn ='modalImgGrande' src={img}  alt='Imagen principal post' />
                </ContenedorImg>
                <ContenedorTxt>
                    <TxtGenerico size = '18px'  > {parrafo} </TxtGenerico>
                    <TxtGenerico size = '14px'  > {fechaFormateada} </TxtGenerico>
                    <ContenedorOwnerPost id ={postSeleccionado.mascotaId} />
                </ContenedorTxt>


            </ContenedorPostStyled>
        </ContenedorGenerico>
    )
}