export const optimizarImagen = (archivo) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(archivo);

        img.onload = () => {
            const MAX_SIZE = 1200;
            let width = img.width;
            let height = img.height;

           
            if (width > height) {
                if (width > MAX_SIZE) {
                    height = Math.round((height * MAX_SIZE) / width);
                    width = MAX_SIZE;
                }
            } else {
                if (height > MAX_SIZE) {
                    width = Math.round((width * MAX_SIZE) / height);
                    height = MAX_SIZE;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

          
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob); 
                } else {
                    reject(new Error('Error al convertir la imagen a blob'));
                }
            }, 'image/jpeg', 0.8);
        };

        img.onerror = (error) => {
            reject(error);
        };
    });
};