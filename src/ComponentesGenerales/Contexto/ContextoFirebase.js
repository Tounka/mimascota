import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, app } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { ContextoGeneral } from './ContextoGeneral';
import { collection, query, where, getDocs, addDoc, setDoc, doc, updateDoc, arrayUnion, limit, getDoc } from "firebase/firestore";
import axios from 'axios';
import { optimizarImagen } from './FnRedimencionar';
import { db } from './firebase';
import { ContextoObjSeleccioado } from './ContextoObjSeleccionados';

export const ContextoFirebase = createContext();
const kkk = 'b35d2a616d9be3271fce705864773e57';

export const ContextoFirebaseProvider = ({ children }) => {
    const [usuario, setUsuario] = useState('');
    const [usuarioFirebase, setUsuarioFirebase] = useState(null);
    const [actualizador, setActualizador] = useState(1);
    const { setSeccionSeleccionada, setValidadorUsuarioFirebase, setMascotaUsuarioSeleccionada, mascotaUsuarioSeleccionada,setMisPost } = useContext(ContextoGeneral);
    const { perfilMascotaSeleccionada, setPerfilMascotaSeleccionada } = useContext(ContextoObjSeleccioado);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMisPost = async () => {
            if (!mascotaUsuarioSeleccionada?.mascotaId) {
                console.error("No hay mascotaId seleccionado");
                return;
            }
            const misPost = await obtenerPost(mascotaUsuarioSeleccionada.mascotaId);
            setMisPost(misPost);
        };
    
        if (mascotaUsuarioSeleccionada?.mascotaId) {
            fetchMisPost();
        }
    }, [mascotaUsuarioSeleccionada,actualizador]);
    
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsuario(user);
                ObtenerUsuarioFirestore(user.uid);
                if (usuarioFirebase) {
                    setSeccionSeleccionada('inicial');
                }
            } else {
                setUsuario(null);
                navigate('/iniciarsesion');
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
        if (!uid) {
            console.error("UID no proporcionado para obtener el usuario de Firestore.");
            return;
        }
    
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", uid));
    
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                setUsuarioFirebase(userData);
                navigate('/');
                console.log("Usuario Firestore:", userData);
                setMascotaUsuarioSeleccionada(userData?.mascotas[0]);
            } else {
                setValidadorUsuarioFirebase(true);
                setUsuarioFirebase(null);
            }
        } catch (error) {
            console.error("Error obteniendo el usuario de Firestore: ", error);
        }
    };

    const obtenerPost = async (mascotaId) => {
        if (!mascotaId) {
            console.error("mascotaId es undefined o null");
            return [];
        }
        
        const postsRef = collection(db, "post");
        const q = query(postsRef, where("mascotaId", "==", mascotaId), limit(20));
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const postsData = querySnapshot.docs.map((doc) => doc.data());
                console.log("Posts encontrados:", postsData);
                return postsData;
            } else {
                console.log("No se encontraron posts para la mascota:", mascotaId);
                return [];
            }
        } catch (error) {
            console.error("Error obteniendo los posts de Firestore:", error);
            return [];
        }
    };

    const obtenerPostGeneral = async () => {
        const postsRef = collection(db, "post");
        const q = query(postsRef, limit(20));
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const postsData = querySnapshot.docs.map((doc) => doc.data());
                console.log("Posts encontrados:", postsData);
                return postsData;
            } else {
                console.log("No se encontraron posts para la mascota:");
                return [];
            }
        } catch (error) {
            console.error("Error obteniendo los posts de Firestore:", error);
            return null;
        }
    };

    const obtenerMascotasSearch = async (q) => {
        try {
            const mascotasRef = collection(db, "mascotas");
    
            // Consultas separadas
            const consultaNombre = query(mascotasRef, where("nombre", "==", q));
            const consultaEspecie = query(mascotasRef, where("especie", "==", q));
    
            const [snapshotNombre, snapshotEspecie] = await Promise.all([
                getDocs(consultaNombre),
                getDocs(consultaEspecie),
            ]);
    
            const mascotasArreglo = [];
    
            snapshotNombre.forEach((doc) => mascotasArreglo.push({ id: doc.id, ...doc.data() }));
            snapshotEspecie.forEach((doc) => {
                const mascota = { id: doc.id, ...doc.data() };
                if (!mascotasArreglo.some((m) => m.id === mascota.id)) {
                    mascotasArreglo.push(mascota);
                }
            });
    
            console.log("Mascotas con nombre o especie igual a:", q, mascotasArreglo);
            return mascotasArreglo;
        } catch (error) {
            console.error("Error obteniendo mascotas de Firestore:", error);
            return [];
        }
    };
    
const obtenerMisMascotas = async (idUsuario) => {
    if (!idUsuario) {
        console.error("ID de usuario no proporcionado para obtener las mascotas.");
        return [];
    }

    const mascotasRef = collection(db, "mascotas");
    const q = query(mascotasRef, where("uid", "==", idUsuario));

    try {
        const querySnapshot = await getDocs(q);
        const mascotasArreglo = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            mascotasArreglo.push(data);
        });
        
        console.log(mascotasArreglo, 'return');
        return mascotasArreglo;
    } catch (error) {
        console.error("Error obteniendo mascotas de Firestore:", error);
        return [];
    }
};


    const AgregarDocumento = async (coleccion, datos) => {
        try {
            const coleccionRef = collection(db, coleccion);
            const docRef = await addDoc(coleccionRef, datos);
            console.log("Documento agregado con ID:", docRef.id);
            return docRef.id;
        } catch (error) {
            console.error("Error al agregar el documento:", error);
            return null;
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
            
            const nuevaMascotaRef = doc(collection(db, "mascotas"));
            const mascotaId = nuevaMascotaRef.id; 
    
        
            await setDoc(nuevaMascotaRef, {
                ...mascota,  
                uid: uid,   
                mascotaId: mascotaId
            });
            
            const usuarioDocRef = doc(db, "users", uid);
    
    
            await updateDoc(usuarioDocRef, {
                mascotas: arrayUnion(mascotaId) 
            });
    
            setActualizador((prev) => prev + 1);
            ObtenerUsuarioFirestore(uid);
            setSeccionSeleccionada('seleccionarMascota');
            console.log("Mascota agregada correctamente con ID:", mascotaId);
        } catch (error) {
            console.error("Error al agregar la mascota:", error);
        }
    };
    

    const AgregarPost = async (post) => {
        try {
            const postCollectionRef = collection(db, "post");
            const docRef = await addDoc(postCollectionRef, post);
            console.log("Post agregado con ID:", docRef.id);
            setSeccionSeleccionada('inicial');
            setActualizador((prev) => prev + 1);

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
    
    const ObtenerDocumentoFirestore = async (nombreColeccion, idDocumento) => {
        try {
     
            const docRef = doc(db, nombreColeccion, idDocumento);
       
            const docSnap = await getDoc(docRef);
            
            // Verificar si el documento existe
            if (docSnap.exists()) {
                console.log("Datos del documento:", docSnap.data());
                return docSnap.data(); // Retorna los datos del documento
            } else {
                console.log("No se encontró el documento en la colección:", nombreColeccion);
                return null; // Retorna null si el documento no existe
            }
        } catch (error) {
           
            return null; // Retorna null en caso de error
        }
    };
    const obtenerDocumentoPorArregloIds = async (nombreColeccion,ids) => {
        const mascotas = [];
    
        for (const id of ids) {
            const docRef = doc(db, nombreColeccion, id);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                mascotas.push(docSnap.data());
            } else {
                console.log(`No se encontró el documento con ID: ${id}`);
            }
        }
    
        return mascotas; // Retorna el arreglo de mascotas
    };

    return (
        <ContextoFirebase.Provider value={{
            usuario,
            usuarioFirebase,
            setUsuarioFirebase,
            cerrarSesion,
            AgregarDocumento,
            AgregarDocumentoId,
            AgregarMascota,
            AgregarPost,
            obtenerPost,
            obtenerPostGeneral,
            subirImagenAImgbb,
            obtenerMascotasSearch,
            obtenerMisMascotas,
            ObtenerDocumentoFirestore,
            obtenerDocumentoPorArregloIds
        }}>
            {children}
        </ContextoFirebase.Provider>
    );
};

export const useFirebase = () => useContext(ContextoFirebase);
