import React, { createContext, useState } from 'react';

export const ContextoGeneral = createContext();


export const ContextoGeneralProvider = ({ children }) => {
    const [seccionSeleccionada, setSeccionSeleccionada] = useState('inicio');
    const [postSeleccionado, setPostSeleccionado] = useState();
    const [mascotaUsuarioSeleccionada, setMascotaUsuarioSeleccionada ] = useState();


  return (
    <ContextoGeneral.Provider value={{ seccionSeleccionada, setSeccionSeleccionada,postSeleccionado, setPostSeleccionado,mascotaUsuarioSeleccionada ,setMascotaUsuarioSeleccionada }}>
      {children}
    </ContextoGeneral.Provider>
  );
};
