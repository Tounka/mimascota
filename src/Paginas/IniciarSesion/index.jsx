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
import { FormularioUsuarioHumano } from './FormularioUsuarioHumano';

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
    transition: background-color 0.3s, transform 0.3s;

    justify-items: center; 
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: var(--ColorAzulPrincipalHover);
        transform: translateY(-2px);
    }
`;

const ContenedorIcono = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 20px 0 0 20px;
`;

const ContenedorTxt = styled.div`
    padding: 10px;
    user-select: none;
    @media (max-width: 550px) {
        font-size: 14px;
    }
`;

const BtnIniciarSesion = ({ icono, txt, fn, error }) => {
    return (
        <>
            <BtnIniciarSesionContenedor onClick={() => fn()}>
                <ContenedorIcono>
                    {icono}
                </ContenedorIcono>
                <ContenedorTxt>
                    {txt}
                </ContenedorTxt>
            </BtnIniciarSesionContenedor>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </>
    );
};

const ContenedorIniciarSesion = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    gap: 20px;
    width: 100%; /* Full width */
    max-width: 400px; /* Limit width */
    height: auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Subtle shadow */
    background-color: white;
`;

const provider = new GoogleAuthProvider();

export const IniciarSesion = () => {
    const { setSeccionSeleccionada, setUsuario, validadorUsuarioFirebase } = useContext(ContextoGeneral);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUsuario(result.user);
            setSeccionSeleccionada('inicial');
        } catch (error) {
            setError('Error al iniciar sesión con Google.');
            console.error('Error de inicio de sesión con Google:', error);
        }
    };

    return (
        <DisplayPrincipalNoMenu>
            <ContenedorGenericoCentrado>
                {!validadorUsuarioFirebase ? (
                    <ContenedorIniciarSesion>
                        <TxtGenerico size='38px' color='var(--ColorAzulPrincipal)' bold>
                            Inicia Sesión
                        </TxtGenerico>
                        <BtnIniciarSesion fn={handleGoogleLogin} icono={<FcGoogle />} error={error} txt='Continua con Google' />
                    </ContenedorIniciarSesion>
                ) : (
                    <FormularioUsuarioHumano />
                )}
            </ContenedorGenericoCentrado>
        </DisplayPrincipalNoMenu>
    );
};
