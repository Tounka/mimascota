import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";

import { ContextoGeneral } from '../../ComponentesGenerales/Contexto/ContextoGeneral';
import { ContenedorGenerico } from '../../ComponentesGenerales/Display.jsx/Contenedores';
import { TxtGenerico } from '../../ComponentesGenerales/Generales/Titulos';
import { ContextoFirebase } from '../../ComponentesGenerales/Contexto/ContextoFirebase';
import { useNavigate } from 'react-router-dom';

// Estilos
const ContenedorPostStyled = styled.div`
    width: 90%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff5a;
    border-radius: 20px;
    padding: 10px;
`;

const FormStyled = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

const ContenedorTxt = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const InputFile = styled.input`
    display: none;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: var(--ColorAzulPrincipal);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
    &:disabled {
        background-color: #cccccc; /* Cambia el color del botón cuando está deshabilitado */
        cursor: not-allowed;
    }
`;

const Label = styled.label`
    cursor: pointer;
    color: var(--ColorAzulPrincipal);
    font-weight: bold;
`;

const ImagePreviewContainer = styled.label`
    width: 150px;
    height: 150px;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--ColorAzulPrincipal);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
`;

const PlaceholderText = styled.span`
    font-size: 14px;
    color: var(--ColorAzulPrincipal);
    text-align: center;
`;

const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const FormularioUsuarioHumano = () => {
    const { AgregarDocumentoId, usuario, setValidadorUsuarioFirebase, setUsuarioFirebase,subirImagenAImgbb } = useContext(ContextoFirebase);
    

    const [file, setFile] = useState(null); 
    const [previewUrl, setPreviewUrl] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío
    const navigate = useNavigate();

    const agregarUsuario = async (data) => {
        // Usa el uid como ID del documento
        const idDocumento = await AgregarDocumentoId("users", data, usuario.uid);
        if (idDocumento) {
            console.log("Usuario agregado correctamente con ID:", idDocumento);
            setUsuarioFirebase({idDocumento:data})
            navigate('/');
        } else {
            console.log("Hubo un problema al agregar el usuario.");
        }
    };

    const formik = useFormik({
        initialValues: {
            nombre: usuario?.displayName.split(' ')[0] || '',
            apellido: usuario?.displayName.split(' ')[1] || '',
            userName: usuario?.displayName || '',
            uid: usuario?.uid || '',
            img: null, 
            mascotas: [],
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            apellido: Yup.string().required('El apellido es obligatorio'),
            userName: Yup.string().required('El apodo es obligatorio'),
            img: Yup.mixed().required('La imagen es obligatoria'), 
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            const urlImagen = await subirImagenAImgbb(values.img);
            const userData = {
                nombre: values.nombre,
                apellido: values.apellido,
                userName: values.userName,
                uid: values.uid,
                img: urlImagen,
                mascotas: [],
                seguidores: [],
                seguidos: [],
                postGuardados: [],
            };

            await agregarUsuario(userData);
            
            setValidadorUsuarioFirebase(true);
            setIsSubmitting(false); 
            console.log('Formulario enviado con datos:', userData);
        },
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        formik.setFieldValue('img', file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <ContenedorPostStyled>
            <TxtGenerico bold size='24px' color='var(--ColorAzulPrincipal)'>Completa tu usuario</TxtGenerico>
            <FormStyled onSubmit={formik.handleSubmit}>
                <ContenedorTxt>
                    <Label htmlFor='nombre'>Nombre</Label>
                    <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.nombre}
                    />
                    {formik.errors.nombre ? <div>{formik.errors.nombre}</div> : null}
                </ContenedorTxt>

                <ContenedorTxt>
                    <Label htmlFor='apellido'>Apellido</Label>
                    <Input
                        id="apellido"
                        name="apellido"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.apellido}
                    />
                    {formik.errors.apellido ? <div>{formik.errors.apellido}</div> : null}
                </ContenedorTxt>

                <ContenedorTxt>
                    <Label htmlFor='userName'>Apodo</Label>
                    <Input
                        id="userName"
                        name="userName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                    />
                    {formik.errors.userName ? <div>{formik.errors.userName}</div> : null}
                </ContenedorTxt>

                <InputFile
                    id="img"
                    name="img"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <ImagePreviewContainer htmlFor="img">
                    {previewUrl ? (
                        <ImagePreview src={previewUrl} alt="Previsualización de la imagen" />
                    ) : (
                        <PlaceholderText>Agregar imagen de perfil</PlaceholderText>
                    )}
                </ImagePreviewContainer>

                {formik.errors.img ? <div>{formik.errors.img}</div> : null}

                <Button type="submit" disabled={isSubmitting}> {/* Deshabilita el botón al enviar */}
                    {isSubmitting ? 'Enviando...' : 'Unir a la familia'} {/* Cambia el texto del botón */}
                </Button>
            </FormStyled>
        </ContenedorPostStyled>
    );
};
