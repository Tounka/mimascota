import React, { createContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export const ContextoGeneral = createContext();


export const ContextoGeneralProvider = ({ children }) => {
    const [seccionSeleccionada, setSeccionSeleccionada] = useState('inicio');
    const [postSeleccionado, setPostSeleccionado] = useState();
    const [mascotaUsuarioSeleccionada, setMascotaUsuarioSeleccionada ] = useState();
    const [usuario, setUsuario] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsuario(user);
                navigate('/');
                setSeccionSeleccionada('inicial');
            } else {
                setUsuario(null);
                navigate('/iniciarsesion')
                setSeccionSeleccionada('iniciarSesion');
            }
        });

        // Limpieza de la suscripción cuando el componente se desmonta
        return () => unsubscribe();
    }, []);

    const cerrarSesion = async () => {
        try {
            await signOut(auth);
            setUsuario(null); // Limpiar estado del usuario
            navigate('/iniciarsesion'); // Redirigir a la página de inicio de sesión
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
        }
    };


  return (
    <ContextoGeneral.Provider value={{ seccionSeleccionada, setSeccionSeleccionada,postSeleccionado, 
    setPostSeleccionado,mascotaUsuarioSeleccionada ,setMascotaUsuarioSeleccionada, usuario,
    cerrarSesion }}>
      {children}
    </ContextoGeneral.Provider>
  );
};
