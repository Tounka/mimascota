import styled from "styled-components"
import { ContenedorGenerico } from "../Display.jsx/Contenedores"
import { ImgPicture } from "../Generales/Img"
import { TxtGenerico } from "../Generales/Titulos"
import { GridImg } from "../Generales/ContenedorArregloImg"
import { catData } from "../Contexto/DataUsuarioTemporal"
import { useContext, useEffect, useState } from "react"
import { ContextoGeneral } from "../Contexto/ContextoGeneral"
import { ContextoFirebase } from "../Contexto/ContextoFirebase"
import { BtnGenerico, BtnSeguir } from "../Generales/Btns"
import { ContextoObjSeleccioado } from "../Contexto/ContextoObjSeleccionados"

const ContenedorImg = styled.div`
    width: 100%;
    height: auto;
    max-height: 300px;
    max-width: 500px;
    overflow: hidden;
    border-radius: 30% 70% 70% 30% / 30% 60% 80% 70% ;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const ContenedorHorizontal = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.gap ?  props.gap : '5px'};
    @media (max-width: 550px) {
        text-align: center;
        justify-content: center;
        width: 100%;
    }
    
`
const ContenedorHorizontalPrincipal = styled(ContenedorHorizontal)`
   
    gap:10px;
    @media (max-width: 550px) {
            flex-direction:column;
            gap: 0;
            width: 100%;
        }

    
`
const ContenedorHorizontalSecundario = styled(ContenedorHorizontal)`
   
    gap:10px;
    @media (max-width: 550px) {
       
            width: auto;
        }

    
`
const ContenedorPerfil = styled.div`
    display: grid;
   
    grid-template-columns: 2fr 3fr;
    gap: 10px;
    @media (max-width: 550px) {
        width: 90%;
        grid-template-columns: 3fr 3fr;
    }
`
const ContenedorSeccion = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5px;
    align-items: ${props => props.left ? 'start' : ''};
    flex-direction: column;
    @media (max-width: 550px) {
        gap: 0;
        justify-content: center;
        align-items: center;

    }
    
`
const Txt = styled.p`
    font-weight: ${props => props.bold ? 'bold' : ''};
    font-size: ${props => props.size ? props.size : '16px'};
    margin: 0;
    
    user-select: none;
    @media (max-width: 550px) {
        text-align: center;
        width: 100%;
    }
    
`


  
 
  
  
export const Perfil = () =>{
    const {mascotaUsuarioSeleccionada, misPost} = useContext(ContextoGeneral);
    const {usuarioFirebase} = useContext(ContextoFirebase);


    const boolMiPerfil = false;

    const nombre = mascotaUsuarioSeleccionada?.nombre || 'Pancho';
    const raza = mascotaUsuarioSeleccionada?.raza || 'Paco';
    const relacion = mascotaUsuarioSeleccionada?.relacion || 'Amigo de ';
    const img = mascotaUsuarioSeleccionada?.img || 'https://www.whiskas.com.mx/cdn-cgi/image/format=auto,q=90/sites/g/files/fnmzdf4861/files/2022-11/eduquer-son-Chaton-comment-bien-eduquer-son-Chaton.jpg';
    const user = usuarioFirebase?.nombre || '';

    const publicaciones = mascotaUsuarioSeleccionada?.posts ? mascotaUsuarioSeleccionada.posts.length : 0;
    const seguidores = mascotaUsuarioSeleccionada?.seguidores ? mascotaUsuarioSeleccionada.seguidores.length : 0;
    const seguidos = mascotaUsuarioSeleccionada?.seguidos ? mascotaUsuarioSeleccionada.seguidos.length : 0;
    

    const arregloImg = mascotaUsuarioSeleccionada?.catData || catData;
    return(
        <ContenedorGenerico>
            <ContenedorPerfil>
                <ContenedorSeccion>
                    <ContenedorImg>
                        <ImgPicture fn='modalImgGrande' alt='Img Perfil' src={img} />
                    </ContenedorImg>
                    
                </ContenedorSeccion>
                
                <ContenedorSeccion left>
                    <ContenedorHorizontal gap = '20px'>
                        <Txt size = '28px' bold > {nombre} </Txt>
                    </ContenedorHorizontal>
                    <Txt size = '16px' bold > {raza} </Txt>
                    
                    <ContenedorHorizontalPrincipal>
                        <ContenedorHorizontalSecundario> <Txt bold>{publicaciones}</Txt> Publicaciones </ContenedorHorizontalSecundario>
                        <ContenedorHorizontalSecundario> <Txt bold>{seguidores}</Txt> Seguidores </ContenedorHorizontalSecundario>
                        <ContenedorHorizontalSecundario> <Txt bold>{seguidos}</Txt> Seguidos </ContenedorHorizontalSecundario>
                    </ContenedorHorizontalPrincipal>

                    <ContenedorHorizontal>
                        <TxtGenerico size = '16px' bold > {relacion} </TxtGenerico>
                        <TxtGenerico size = '16px'  > {user} </TxtGenerico>
                    </ContenedorHorizontal>
                </ContenedorSeccion>

            </ContenedorPerfil>
            <GridImg post = {misPost} />

        </ContenedorGenerico>
    )
}


export const PerfilOtrasMascotas = () =>{
    const {perfilMascotaSeleccionada,setPerfilMascotaSeleccionada} = useContext(ContextoObjSeleccioado);
    const {mascotaUsuarioSeleccionada, setMascotaUsuarioSeleccionada} = useContext(ContextoGeneral);
    const {usuarioFirebase, obtenerPost, ObtenerDocumentoFirestore} = useContext(ContextoFirebase);
    const [boolSeguido, setBoolSeguido] = useState(false);
    const [post, setPost] = useState();

    useEffect(() => {
        const fetchPosts = async () => {
            const todosLosPost = await obtenerPost(perfilMascotaSeleccionada?.mascotaId);
            setPost(todosLosPost);
        };
        if(perfilMascotaSeleccionada){
            fetchPosts();
        }
    }, [perfilMascotaSeleccionada]);
    useEffect(() => {
        const fetchPerfil = async () => {
            const mascota = await ObtenerDocumentoFirestore('mascotas' ,perfilMascotaSeleccionada?.mascotaId);
            setPerfilMascotaSeleccionada(mascota);
        };
        if(perfilMascotaSeleccionada){
            fetchPerfil();
            console.log('asdasda')
        }
    }, [boolSeguido]);
    

    const VerificarSeguidores = () =>{
        if(perfilMascotaSeleccionada?.seguidores.includes(mascotaUsuarioSeleccionada?.mascotaId)){
            setBoolSeguido(true)
 

        }else{
            setBoolSeguido(false)

        }
    }
    useEffect(() =>{

        VerificarSeguidores();
    }, [perfilMascotaSeleccionada])
    
    

    const nombre = perfilMascotaSeleccionada?.nombre || 'Pancho';
    const raza = perfilMascotaSeleccionada?.raza || 'Paco';
    const relacion = perfilMascotaSeleccionada?.relacion || 'Amigo de ';
    const img = perfilMascotaSeleccionada?.img || 'https://www.whiskas.com.mx/cdn-cgi/image/format=auto,q=90/sites/g/files/fnmzdf4861/files/2022-11/eduquer-son-Chaton-comment-bien-eduquer-son-Chaton.jpg';
    const user = usuarioFirebase?.nombre || '';

    const publicaciones = perfilMascotaSeleccionada?.posts ? perfilMascotaSeleccionada.posts.length : 0;
    const seguidores = perfilMascotaSeleccionada?.seguidores ? perfilMascotaSeleccionada.seguidores.length : 0;
    const seguidos = perfilMascotaSeleccionada?.seguidos ? perfilMascotaSeleccionada.seguidos.length : 0;
    

    const arregloImg = perfilMascotaSeleccionada?.catData || catData;
    return(
        <ContenedorGenerico>
            <ContenedorPerfil>
                <ContenedorSeccion>
                    <ContenedorImg>
                        <ImgPicture fn='modalImgGrande' alt='Img Perfil' src={img} />
                    </ContenedorImg>
                    
                </ContenedorSeccion>
                
                <ContenedorSeccion left>
                    <ContenedorHorizontal gap = '20px'>
                        <Txt size = '28px' bold > {nombre} </Txt>
                    </ContenedorHorizontal>
                    <Txt size = '16px' bold > {raza} </Txt>
                    
                    <ContenedorHorizontalPrincipal>
                        <ContenedorHorizontalSecundario> <Txt bold>{publicaciones}</Txt> Publicaciones </ContenedorHorizontalSecundario>
                        <ContenedorHorizontalSecundario> <Txt bold>{seguidores}</Txt> Seguidores </ContenedorHorizontalSecundario>
                        <ContenedorHorizontalSecundario> <Txt bold>{seguidos}</Txt> Seguidos </ContenedorHorizontalSecundario>
                    </ContenedorHorizontalPrincipal>

                    <ContenedorHorizontal>
                        <TxtGenerico size = '16px' bold > {relacion} </TxtGenerico>
                        <TxtGenerico size = '16px'  > {user} </TxtGenerico>
                    </ContenedorHorizontal>
                </ContenedorSeccion>

            </ContenedorPerfil>
            <GridImg post = {post} />

        </ContenedorGenerico>
    )
}