import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";

import { ContextoGeneral } from "../../Contexto/ContextoGeneral";
import { ContenedorGenerico } from '../../Display.jsx/Contenedores';
import { TxtGenerico } from '../../Generales/Titulos';
import { ContextoFirebase } from '../../Contexto/ContextoFirebase';

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
    gap: 10px;
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
        background-color: #cccccc;
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
`;

const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const FormularioMascota = () => {
    const { postSeleccionado,setSeccionSeleccionada } = useContext(ContextoGeneral);
    const { usuario,AgregarMascota,subirImagenAImgbb  } = useContext(ContextoFirebase);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            nombre: postSeleccionado?.nombre || '',
            raza: postSeleccionado?.raza || '',
            especie: postSeleccionado?.especie || '',
            relacion: postSeleccionado?.relacion || 'Amigo de ',
            user: usuario.uid,
            img: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            raza: Yup.string().required('La raza es obligatoria'),
            especie: Yup.string().required('La especie es obligatoria'),
            relacion: Yup.string().required('La relación es obligatoria'),
            user: Yup.string().required('El usuario es obligatorio'),
            img: Yup.mixed().required('La imagen es obligatoria'),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true); 

            try {
                // Espera a que la imagen se suba y obtén la URL
                const urlImagen = await subirImagenAImgbb(values.img);
            
                // Si la imagen se subió correctamente, crea un objeto con los datos
                if (urlImagen) {
                    const mascotaData = {
                        nombre: values.nombre,
                        raza: values.raza,
                        especie: values.especie,
                        relacion: values.relacion,
                        uid: values.user,
                        img: urlImagen // Usa la URL de la imagen subida
                    };
            
                    // Llama a la función para agregar la mascota con el objeto de datos
                    await AgregarMascota(values.user, mascotaData);
                    
                    console.log('Formulario enviado con imagen:', values);
                    setSeccionSeleccionada('seleccionarMascota');
                } else {
                    console.error('No se pudo subir la imagen');
                }
            } catch (error) {
                console.error("Error al enviar el formulario:", error);
            } finally {
                setIsSubmitting(false);
            }
            
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
        <ContenedorGenerico>
            <ContenedorPostStyled>
                <TxtGenerico bold size='24px' color ='var(--ColorAzulPrincipal)'>Agrega a tu amiguito</TxtGenerico>
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
                        <Label htmlFor='especie'>Especie</Label>
                        <Input
                            id="especie"
                            name="especie"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.especie}
                        />
                        {formik.errors.raza ? <div>{formik.errors.especie}</div> : null}
                    </ContenedorTxt>

                    <ContenedorTxt>
                        <Label htmlFor='raza'>Raza</Label>
                        <Input
                            id="raza"
                            name="raza"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.raza}
                        />
                        {formik.errors.raza ? <div>{formik.errors.raza}</div> : null}
                    </ContenedorTxt>

                    <ContenedorTxt>
                        <Label htmlFor='relacion'>Relación</Label>
                        <Input
                            id="relacion"
                            name="relacion"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.relacion}
                        />
                        {formik.errors.relacion ? <div>{formik.errors.relacion}</div> : null}
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
                            <PlaceholderText>Agregar imagen</PlaceholderText>
                        )}
                    </ImagePreviewContainer>

                    {formik.errors.img ? <div>{formik.errors.img}</div> : null}

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Unir a la familia"}
                    </Button>
                </FormStyled>
            </ContenedorPostStyled>
        </ContenedorGenerico>
    );
};