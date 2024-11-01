import React, { createContext, useEffect, useState } from 'react';


export const ContextoObjSeleccioado = createContext();


export const ContextoObjSeleccioadoProvider = ({ children }) => {
    const [modalSeleccionado, setModalSeleccionado] = useState([]);
    const [perfilMascotaSeleccionada, setPerfilMascotaSeleccionada ] = useState();

  return (
    <ContextoObjSeleccioado.Provider value={{ modalSeleccionado, setModalSeleccionado,perfilMascotaSeleccionada, setPerfilMascotaSeleccionada }}>
      {children}
    </ContextoObjSeleccioado.Provider>
  );
};
