import React, { createContext, useEffect, useState } from 'react';


export const ContextoObjSeleccioado = createContext();


export const ContextoObjSeleccioadoProvider = ({ children }) => {
    const [modalSeleccionado, setModalSeleccionado] = useState([]);


  return (
    <ContextoObjSeleccioado.Provider value={{ modalSeleccionado, setModalSeleccionado }}>
      {children}
    </ContextoObjSeleccioado.Provider>
  );
};
