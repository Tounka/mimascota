import React, { createContext, useEffect, useState } from 'react';


export const ContextoGeneral = createContext();


export const ContextoGeneralProvider = ({ children }) => {
    const [seccionSeleccionada, setSeccionSeleccionada] = useState('inicio');
    const [postSeleccionado, setPostSeleccionado] = useState();
    const [misMascotas, setMisMascotas] = useState();
    const [misPost, setMisPost] = useState();

    const [boolSeccionInicio, setBoolSeccionInicio] = useState(false);
    const [boolModalGeneral, setBoolModalGeneral] = useState(false);
    const [mascotaUsuarioSeleccionada, setMascotaUsuarioSeleccionada ] = useState();


    const [validadorUsuarioFirebase, setValidadorUsuarioFirebase] = useState(false)
    

  
  return (
    <ContextoGeneral.Provider value={{ seccionSeleccionada, setSeccionSeleccionada,postSeleccionado, 
    setPostSeleccionado,mascotaUsuarioSeleccionada ,setMascotaUsuarioSeleccionada, validadorUsuarioFirebase,setValidadorUsuarioFirebase,
    boolSeccionInicio,setBoolSeccionInicio,boolModalGeneral,setBoolModalGeneral, misMascotas,setMisMascotas,setMisPost,misPost  }}>
      {children}
    </ContextoGeneral.Provider>
  );
};
