import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";

import { ContextoGeneral } from "../../Contexto/ContextoGeneral";
import { ContenedorGenerico } from '../../Display.jsx/Contenedores';
import { TxtGenerico } from '../../Generales/Titulos';
import { ContextoFirebase } from '../../Contexto/ContextoFirebase';
import { useNavigate } from 'react-router-dom';

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
export const FormularioPost = () => {
    const { postSeleccionado, setSeccionSeleccionada, mascotaUsuarioSeleccionada } = useContext(ContextoGeneral);
    const { usuario, AgregarPost, subirImagenAImgbb } = useContext(ContextoFirebase);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            uid: usuario.uid,
            mascotaId: mascotaUsuarioSeleccionada?.mascotaId,
            titulo: '',
            img: '',
            fecha: new Date(),
            parrafo: '',
        },
        validationSchema: Yup.object({
            titulo: Yup.string().required('El titulo es obligatorio'),
            parrafo: Yup.string().required('El parrafo es obligatorio'),
            img: Yup.mixed().required('La imagen es obligatoria'),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);

            try {
                const urlImagen = await subirImagenAImgbb(values.img);

                if (urlImagen) {
                    const postData = {
                        uid: values.uid,
                        mascotaId: values.mascotaId,
                        titulo: values.titulo,
                        img: urlImagen,
                        fecha: values.fecha,
                        parrafo: values.parrafo,
                    };

                    await AgregarPost(postData);
                    setSeccionSeleccionada('inicial');
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
                <TxtGenerico bold size='24px' color='var(--ColorAzulPrincipal)'>Subir post</TxtGenerico>
                <FormStyled onSubmit={formik.handleSubmit}>
                    <ContenedorTxt>
                        <Label htmlFor='titulo'>Titulo</Label>
                        <Input
                            id="titulo"
                            name="titulo"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.titulo}
                        />
                        {formik.touched.titulo && formik.errors.titulo ? <div>{formik.errors.titulo}</div> : null}
                    </ContenedorTxt>

                    <ContenedorTxt>
                        <Label htmlFor='parrafo'>Párrafo</Label>
                        <Input
                            id="parrafo"
                            name="parrafo"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.parrafo}
                        />
                        {formik.touched.parrafo && formik.errors.parrafo ? <div>{formik.errors.parrafo}</div> : null}
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

                    {formik.touched.img && formik.errors.img ? <div>{formik.errors.img}</div> : null}

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Unir a la familia"}
                    </Button>
                </FormStyled>
            </ContenedorPostStyled>
        </ContenedorGenerico>
    );
};
