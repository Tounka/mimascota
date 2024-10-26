import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, app } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { ContextoGeneral } from './ContextoGeneral';
import { collection, query, where, getDocs, addDoc, setDoc,  doc, updateDoc, arrayUnion  } from "firebase/firestore";
import axios from 'axios';
import { optimizarImagen } from './FnRedimencionar';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
export const ContextoFirebase = createContext();
const kkk = 'b35d2a616d9be3271fce705864773e57'; 


export const ContextoFirebaseProvider = ({ children }) => {
    const [usuario, setUsuario] = useState('');
    const [usuarioFirebase, setUsuarioFirebase] = useState(null);
    const {setSeccionSeleccionada, setValidadorUsuarioFirebase} = useContext(ContextoGeneral);
    const navigate = useNavigate();
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsuario(user);
                ObtenerUsuarioFirestore(user.uid)
                if(usuarioFirebase){
                    
                    setSeccionSeleccionada('inicial');
                    
                    
                }
            } else {
                setUsuario(null);
                navigate('/iniciarsesion')
                setSeccionSeleccionada('iniciarSesion');
            }
        });

        return () => unsubscribe();
    }, [usuario]);

    const cerrarSesion = async () => {
        try {
            await signOut(auth);
            setUsuario(null);
            navigate('/iniciarsesion'); 
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
        }
    };

    const ObtenerUsuarioFirestore = async (uid) => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", uid));

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                // Almacena los datos del primer documento encontrado
                const userData = querySnapshot.docs[0].data();
                setUsuarioFirebase(userData);
                navigate('/');
                console.log("Usuario Firestore:", userData);
            } else {
                setValidadorUsuarioFirebase(true);
                setUsuarioFirebase(null);
            }

        } catch (error) {
            console.error("Error obteniendo el usuario de Firestore: ", error);
        }
    };

    const AgregarDocumento = async (coleccion, datos) => {
    
        try {
            // Referencia a la colección en Firestore
            const coleccionRef = collection(db, coleccion);
    
            // Agregar el documento a la colección
            const docRef = await addDoc(coleccionRef, datos);
            
            console.log("Documento agregado con ID:", docRef.id);
            return docRef.id; // Devuelve el ID del documento si necesitas referenciarlo más adelante
        } catch (error) {
            console.error("Error al agregar el documento:", error);
            return null; // Devuelve null en caso de error
        }
    };

    const AgregarDocumentoId = async (coleccion, datos, uid) => {
        try {
           
            const coleccionRef = collection(db, coleccion);
    
            
            await setDoc(doc(coleccionRef, uid), datos);
    
            console.log("Documento agregado con ID:", uid);
            return uid; 
        } catch (error) {
            console.error("Error al agregar el documento:", error);
            return null; 
        }
    };

    const AgregarMascota = async (uid, mascota) => {
        try {
           
            const usuarioDocRef = doc(db, "users", uid);
    
            
            await updateDoc(usuarioDocRef, {
                mascotas: arrayUnion(mascota)
            });
    
            console.log("Mascota agregada correctamente al usuario:", uid);
        } catch (error) {
            console.error("Error al agregar la mascota:", error);
        }
    };

    const subirImagenAImgbb = async (archivo) => {
        const url = `https://api.imgbb.com/1/upload?key=${kkk}`;
    
        try {
            
            const imagenOptimizada = await optimizarImagen(archivo);
            
            const formData = new FormData();
            formData.append('image', imagenOptimizada); 
        
            const response = await axios.post(url, formData);
            if (response.data.success) {
                
                return response.data.data.url; 
            } else {
                throw new Error('Error al subir la imagen a ImgBB');
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            return null; 
        }
    };
    

  return (
    <ContextoFirebase.Provider value={{usuario,usuarioFirebase, setUsuarioFirebase , cerrarSesion, AgregarDocumento, AgregarDocumentoId, AgregarMascota,subirImagenAImgbb  }}>
      {children}
    </ContextoFirebase.Provider>
  );
};
