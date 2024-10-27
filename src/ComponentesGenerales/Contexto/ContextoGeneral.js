import React, { createContext, useEffect, useState } from 'react';


export const ContextoGeneral = createContext();


export const ContextoGeneralProvider = ({ children }) => {
    const [seccionSeleccionada, setSeccionSeleccionada] = useState('inicio');
    const [postSeleccionado, setPostSeleccionado] = useState();
    const [mascotaUsuarioSeleccionada, setMascotaUsuarioSeleccionada ] = useState();

    const [validadorUsuarioFirebase, setValidadorUsuarioFirebase] = useState(false)
    


  return (
    <ContextoGeneral.Provider value={{ seccionSeleccionada, setSeccionSeleccionada,postSeleccionado, 
    setPostSeleccionado,mascotaUsuarioSeleccionada ,setMascotaUsuarioSeleccionada, validadorUsuarioFirebase,setValidadorUsuarioFirebase }}>
      {children}
    </ContextoGeneral.Provider>
  );
};
