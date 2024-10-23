import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";

import { ContextoGeneral } from "../../Contexto/ContextoGeneral";
import { ContenedorGenerico } from '../../Display.jsx/Contenedores';
import { TxtGenerico } from '../../Generales/Titulos';

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
    const { postSeleccionado } = useContext(ContextoGeneral);
    const [file, setFile] = useState(null); // Estado para almacenar la imagen seleccionada
    const [previewUrl, setPreviewUrl] = useState(null); // Estado para la previsualización de la imagen

    const formik = useFormik({
        initialValues: {
            nombre: postSeleccionado?.nombre || 'Pancho',
            raza: postSeleccionado?.raza || 'Paco',
            relacion: postSeleccionado?.relacion || 'Amigo de ',
            user: postSeleccionado?.user || 'Pam',
            img: null, // Placeholder para la imagen
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            raza: Yup.string().required('La raza es obligatoria'),
            relacion: Yup.string().required('La relación es obligatoria'),
            user: Yup.string().required('El usuario es obligatorio'),
            img: Yup.mixed().required('La imagen es obligatoria'), // Validación para la imagen
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('nombre', values.nombre);
            formData.append('raza', values.raza);
            formData.append('relacion', values.relacion);
            formData.append('user', values.user);
            formData.append('img', file); // Agregar la imagen al FormData

            console.log('Formulario enviado con imagen:', formData);
            // Aquí puedes manejar el guardado del objeto "pet" (por ejemplo, enviarlo a un backend)
        },
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        formik.setFieldValue('img', file);

        // Crear una previsualización de la imagen
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
                <TxtGenerico bold size='24px' color ='var(--ColorAzulPrincipal)' >Agrega a tu amiguito</TxtGenerico>
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

                    <ContenedorTxt>
                        <Label htmlFor='user'>Usuario</Label>
                        <Input
                            id="user"
                            name="user"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.user}
                        />
                        {formik.errors.user ? <div>{formik.errors.user}</div> : null}
                    </ContenedorTxt>

                    {/* Input de archivo oculto */}
                    <InputFile
                        id="img"
                        name="img"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange} // Manejar la selección de imagen
                    />

                    {/* Contenedor de previsualización */}
                    <ImagePreviewContainer htmlFor="img">
                        {previewUrl ? (
                            <ImagePreview src={previewUrl} alt="Previsualización de la imagen" />
                        ) : (
                            <PlaceholderText>Agregar imagen</PlaceholderText>
                        )}
                    </ImagePreviewContainer>

                    {formik.errors.img ? <div>{formik.errors.img}</div> : null}

                    <Button type="submit">Unir a la familia</Button>
                </FormStyled>
            </ContenedorPostStyled>
        </ContenedorGenerico>
    );
};
