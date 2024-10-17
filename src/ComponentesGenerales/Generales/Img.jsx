

export const ImgPicture = ({ src, alt }) => {
    
    return src ? (
            <picture>
                <source srcSet={`${src}`} type="image/webp" />
                <source srcSet={`${src}`} type="image/jpeg" />
                <img src={`${src}`} alt={alt} loading="lazy"/>
            </picture>
    
    ) : null;
};
