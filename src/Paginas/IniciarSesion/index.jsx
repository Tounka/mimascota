import React, { useContext, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../ComponentesGenerales/Contexto/firebase';
import { ContenedorGenericoCentrado } from '../../ComponentesGenerales/Display.jsx/Contenedores';
import { TxtGenerico } from '../../ComponentesGenerales/Generales/Titulos';
import { ContextoGeneral } from '../../ComponentesGenerales/Contexto/ContextoGeneral';
import { DisplayPrincipalNoMenu } from '../../ComponentesGenerales/Display.jsx/DisplayPrincipal';
import { BtnGenerico } from '../../ComponentesGenerales/Generales/Btns';
import { FcGoogle } from "react-icons/fc";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const BtnIniciarSesionContenedor = styled.div`

    display: grid;
    grid-template-columns: 40px auto;
    color: white;
    background-color: var(--ColorAzulPrincipal);
    max-width: 80%;
    border-radius: 20px;
    border: solid 1px var(--ColorAzulPrincipal);
    overflow: hidden;
    width: 600px;
    height: auto;
    font-size: 24px;
    

    justify-items: center; 
    align-items: center;
    cursor: pointer;

`
const ContenedorIcono = styled.div `
        display: flex;
       justify-content: center; 
       align-items: center;

       width: 100%;
       height: 100%;
       
       background-color:white;
`
const ContenedorTxt = styled.div`
    padding: 10px;
    user-select: none;
`

const BtnIniciarSesion = ({icono, txt, fn, error}) =>{
    return(
        <>
        <BtnIniciarSesionContenedor onClick={() => fn()}>
            <ContenedorIcono>
                {icono}
            </ContenedorIcono>
            <ContenedorTxt>
                {txt}
            </ContenedorTxt>
            
        </BtnIniciarSesionContenedor>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}

const ContenedorIniciarSesion = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly; 
    align-items: center;

    gap: 20px;
    width: 1200px;
    max-width: 80%;
    height: 400px;
    max-height: 70%;
    background-color: white;
`
const provider = new GoogleAuthProvider();

export const IniciarSesion = () => {
    const {setSeccionSeleccionada,setUsuario} = useContext(ContextoGeneral);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUsuario(result.user);
            setSeccionSeleccionada('inicial');
            navigate('/');
            
        } catch (error) {
            setError('Error al iniciar sesión con Google.');
            console.error('Error de inicio de sesión con Google:', error);
        }
    };

    return (
        <DisplayPrincipalNoMenu>
            <ContenedorGenericoCentrado >
                <ContenedorIniciarSesion>
                    <TxtGenerico size= '48px' color='var(--ColorAzulPrincipal)' bold >Inicia Sesión</TxtGenerico>

                    <BtnIniciarSesion fn={handleGoogleLogin} icono={<FcGoogle />} error={error} txt='Continua con Google' />

                </ContenedorIniciarSesion>
         
            </ContenedorGenericoCentrado>
        </DisplayPrincipalNoMenu>
    
    );
};
