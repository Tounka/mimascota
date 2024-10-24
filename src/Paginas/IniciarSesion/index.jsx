import React, { useContext, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../ComponentesGenerales/Contexto/firebase';
import { ContenedorGenerico } from '../../ComponentesGenerales/Display.jsx/Contenedores';
import { TxtGenerico } from '../../ComponentesGenerales/Generales/Titulos';
import { ContextoGeneral } from '../../ComponentesGenerales/Contexto/ContextoGeneral';
import { DisplayPrincipalNoMenu } from '../../ComponentesGenerales/Display.jsx/DisplayPrincipal';
const provider = new GoogleAuthProvider();

export const IniciarSesion = () => {
    const {setSeccionSeleccionada} = useContext(ContextoGeneral);
    
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('Inicio de sesión exitoso:', result.user);
            setSeccionSeleccionada('inicial');
            // Redireccionar o hacer algo después del inicio de sesión
        } catch (error) {
            setError('Error al iniciar sesión con Google.');
            console.error('Error de inicio de sesión con Google:', error);
        }
    };

    return (
        <DisplayPrincipalNoMenu>
            <ContenedorGenerico >
                <TxtGenerico>Inicia sesión con Google</TxtGenerico>
                <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </ContenedorGenerico>
        </DisplayPrincipalNoMenu>
    
    );
};
