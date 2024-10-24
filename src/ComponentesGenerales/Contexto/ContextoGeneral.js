import React, { createContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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


  return (
    <ContextoGeneral.Provider value={{ seccionSeleccionada, setSeccionSeleccionada,postSeleccionado, setPostSeleccionado,mascotaUsuarioSeleccionada ,setMascotaUsuarioSeleccionada, usuario }}>
      {children}
    </ContextoGeneral.Provider>
  );
};
