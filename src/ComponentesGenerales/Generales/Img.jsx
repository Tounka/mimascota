import { useContext } from "react";
import { ContextoGeneral } from "../Contexto/ContextoGeneral";
import styled from "styled-components";
import { ContextoObjSeleccioado } from "../Contexto/ContextoObjSeleccionados";



export const ImgPicture = ({ src, alt, fn }) => {
    const {setBoolModalGeneral} = useContext(ContextoGeneral);
    const {setModalSeleccionado} = useContext(ContextoObjSeleccioado);
    const handleClick =  () => {
        if(fn == 'modalImgGrande'){
            setBoolModalGeneral(true);
            setModalSeleccionado(['imgGrandeModal', {img:src} ])
            
        }
    }
    return src ? (
            <picture onClick={()  => handleClick()}>
                <source srcSet={`${src}`} type="image/webp" />
                <source srcSet={`${src}`} type="image/jpeg" />
                <img src={`${src}`} alt={alt} loading="lazy"/>
            </picture>
    
    ) : null;
};
