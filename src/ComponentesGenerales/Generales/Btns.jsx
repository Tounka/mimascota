import { useContext, useState } from "react";
import styled from "styled-components";
import { ContextoObjSeleccioado } from "../Contexto/ContextoObjSeleccionados";
import { ContextoGeneral } from "../Contexto/ContextoGeneral";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Contexto/firebase";

export const BtnGenerico = styled.button`
    width: ${(props) => props.width || "120px"};
    height: ${(props) => props.height || "60px"};
    color: ${(props) => props.color || ""};
    background-color: ${(props) => props.bgColor || ""};
    padding: 10px;
    font-size: 22px;
    font-weight: bold;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;


export const BtnSeguirStyled = styled.button`
    width: 80px;
    height: 40px;
    color: ${(props) => (props.seguido ? "white" : "var(--ColorAzulPrincipal)")};
    background-color: ${(props) => (props.seguido ? "var(--ColorAzulPrincipal)" : "white")};
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;export const BtnSeguir = ({ boolSeguido, setBoolSeguido, mascotaParaSeguir }) => {
    const { perfilMascotaSeleccionada, setPerfilMascotaSeleccionada } = useContext(ContextoObjSeleccioado);
    const { mascotaUsuarioSeleccionada, setMascotaUsuarioSeleccionada } = useContext(ContextoGeneral);

    const manejarSeguir = async () => {
        if (!perfilMascotaSeleccionada || !mascotaUsuarioSeleccionada) {
            console.log("El perfil de la mascota o el usuario no están definidos.");
            return;
        }

        const mascotaId = perfilMascotaSeleccionada.mascotaId; // ID de la mascota a la que se va a seguir o dejar de seguir
        const miMascotaId = mascotaUsuarioSeleccionada.mascotaId; // ID de la mascota que sigue o deja de seguir

        try {
            // Verificar si ya sigo a esta mascota
            if (mascotaParaSeguir.seguidores && mascotaParaSeguir.seguidores.includes(miMascotaId)) {
                // Dejar de seguir: eliminar el ID de los arrays de seguidores y seguidos
                const nuevosSeguidores = mascotaParaSeguir.seguidores.filter(id => id !== miMascotaId);
                const nuevosSeguidos = mascotaParaSeguir.seguidos.filter(id => id !== mascotaId);

                await updateDoc(doc(db, "mascotas", mascotaId), {
                    seguidores: nuevosSeguidores // Actualiza la lista de seguidores de la mascota que se está dejando de seguir
                });

                await updateDoc(doc(db, "mascotas", miMascotaId), {
                    seguidos: nuevosSeguidos // Actualiza la lista de seguidos de la mascota del usuario
                });

                setBoolSeguido(false);
                
            } else {
                // Seguir: agregar el ID al array de seguidores y seguidos
                await updateDoc(doc(db, "mascotas", mascotaId), {
                    seguidores: [...(mascotaParaSeguir.seguidores || []), miMascotaId] // Agrega el ID a la lista de seguidores de la mascota
                });

                await updateDoc(doc(db, "mascotas", miMascotaId), {
                    seguidos: [...(mascotaParaSeguir.seguidos || []), mascotaId] // Agrega el ID a la lista de seguidos de la mascota del usuario
                });

                setBoolSeguido(true);
                
            }
        } catch (error) {
            console.error("Error al manejar el seguimiento:", error);
        }
    };

    return (
        <BtnSeguirStyled seguido={boolSeguido} onClick={manejarSeguir}>
            {boolSeguido ? "Dejar de seguir" : "Seguir"}
        </BtnSeguirStyled>
    );
};