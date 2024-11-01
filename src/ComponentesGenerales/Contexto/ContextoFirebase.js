import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, app } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { ContextoGeneral } from './ContextoGeneral';
import { collection, query, where, getDocs, addDoc, setDoc,  doc, updateDoc, arrayUnion,limit  } from "firebase/firestore";
import axios from 'axios';
import { optimizarImagen } from './FnRedimencionar';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import { ContextoObjSeleccioado } from './ContextoObjSeleccionados';
export const ContextoFirebase = createContext();
const kkk = 'b35d2a616d9be3271fce705864773e57'; 


export const ContextoFirebaseProvider = ({ children }) => {
    const [usuario, setUsuario] = useState('');
    const [usuarioFirebase, setUsuarioFirebase] = useState(null);
    const [validarUsuarioDiferente, setValidarUsuarioDiferente] = useState(false);
    const {setSeccionSeleccionada, setValidadorUsuarioFirebase, setMascotaUsuarioSeleccionada, mascotaUsuarioSeleccionada} = useContext(ContextoGeneral);
    const {perfilMascotaSeleccionada, setPerfilMascotaSeleccionada} = useContext(ContextoObjSeleccioado);
    const navigate = useNavigate();
    
    
    
    useEffect(() => {
        const obtenerDatosMascotaConPosts = async () => {
            try {
                const posts = await obtenerPost(mascotaUsuarioSeleccionada.mascotaId);
                if (posts) {
                    const mascotaConPosts = { ...mascotaUsuarioSeleccionada, posts };
                    console.log(mascotaConPosts);
                    setMascotaUsuarioSeleccionada(mascotaConPosts);

                }
            } catch (error) {
                console.error("Error obteniendo los datos de la mascota con posts:", error);
            }
        };
    
        if (mascotaUsuarioSeleccionada?.mascotaId) {
            obtenerDatosMascotaConPosts();
        }
    }, [mascotaUsuarioSeleccionada?.mascotaId]);

    useEffect(() => {
        console.log(perfilMascotaSeleccionada, 'Hola')
        const obtenerDatosMascotaConPostsOut = async () => {
            try {
                const posts = await obtenerPost(perfilMascotaSeleccionada.mascotaId);
                if (posts) {
                    const mascotaConPosts = { ...perfilMascotaSeleccionada, posts };
                    console.log(mascotaConPosts, 'postOut');
                    setPerfilMascotaSeleccionada(mascotaConPosts);

                }
            } catch (error) {
                console.error("Error obteniendo los datos de la mascota con posts:", error);
            }
        };
    
        if (perfilMascotaSeleccionada?.mascotaId) {
            obtenerDatosMascotaConPostsOut();
        }
    }, [perfilMascotaSeleccionada?.mascotaId]);

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

                setMascotaUsuarioSeleccionada(userData?.mascotas[0])
                
            } else {
                setValidadorUsuarioFirebase(true);
                setUsuarioFirebase(null);
            }

        } catch (error) {
            console.error("Error obteniendo el usuario de Firestore: ", error);
        }
    };

    const obtenerPost = async (mascotaId) => {
        const postsRef = collection(db, "Post");
        const q = query(postsRef, where("mascotaId", "==", mascotaId), limit(20));
    
        try {
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                // Almacena los datos de todos los documentos encontrados
                const postsData = querySnapshot.docs.map((doc) => doc.data());
    
                console.log("Posts encontrados:", postsData);
    
                return postsData; // Devuelve todos los posts encontrados como un arreglo
            } else {
                console.log("No se encontraron posts para la mascota:", mascotaId);
                return []; // Devuelve un arreglo vacío si no hay resultados
            }
    
        } catch (error) {
            console.error("Error obteniendo los posts de Firestore:", error);
            return null; // Devuelve null en caso de error
        }
    };

        const obtenerPostGeneral = async () => {
            const postsRef = collection(db, "Post");
            const q = query(postsRef, limit(20)); // Aquí se pasa `postsRef` como el primer argumento de `query`
            
            try {
                const querySnapshot = await getDocs(q);
            
                if (!querySnapshot.empty) {
                    // Almacena los datos de todos los documentos encontrados
                    const postsData = querySnapshot.docs.map((doc) => doc.data());
            
                    console.log("Posts encontrados:", postsData);
            
                    return postsData; // Devuelve todos los posts encontrados como un arreglo
                } else {
                    console.log("No se encontraron posts para la mascota:");
                    return []; // Devuelve un arreglo vacío si no hay resultados
                }
            
            } catch (error) {
                console.error("Error obteniendo los posts de Firestore:", error);
                return null; // Devuelve null en caso de error
            }
        };

        const obtenerMascotasSearch = async (q) => {
            const usersRef = collection(db, "users");
        
            try {
                const querySnapshot = await getDocs(usersRef); // No es necesario pasar query ya que estamos obteniendo todos los usuarios
                const mascotasJuan = [];
        
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const mascotas = data.mascotas || [];
        
                    mascotas.forEach((mascota) => {
                        if (mascota.nombre === q || mascota.especie === q) {
                            mascotasJuan.push(mascota);
                        }
                    });
                });
        
                console.log("Mascotas con nombre o raza igual a:", q, mascotasJuan);
                return mascotasJuan; // Devuelve el arreglo con las mascotas filtradas
        
            } catch (error) {
                console.error("Error obteniendo mascotas de Firestore:", error);
                return []; // Devuelve un arreglo vacío en caso de error
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
            ObtenerUsuarioFirestore(uid);
            setSeccionSeleccionada('seleccionarMascota')
            await updateDoc(usuarioDocRef, {
                mascotas: arrayUnion(mascota)
            });
    
            console.log("Mascota agregada correctamente al usuario:", uid);
        } catch (error) {
            console.error("Error al agregar la mascota:", error);
        }
    };
    const AgregarPost = async ( post) => {
        try {
            const postCollectionRef = collection(db, "Post");
            const docRef = await addDoc(postCollectionRef, post);
    
            console.log("Post agregado con ID:", docRef.id);
    
            setSeccionSeleccionada('inicial');
    
        } catch (error) {
            console.error("Error al agregar el post:", error);
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
    <ContextoFirebase.Provider value={{usuario,usuarioFirebase, setUsuarioFirebase , cerrarSesion, AgregarDocumento, AgregarDocumentoId, 
    AgregarMascota, AgregarPost,subirImagenAImgbb, obtenerPostGeneral, obtenerMascotasSearch  }}>
      {children}
    </ContextoFirebase.Provider>
  );
};
