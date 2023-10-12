/* eslint-disable prettier/prettier */
import * as fs from 'fs'

export const destinationImageProfile = (req, file, callback) => {
    const parts = file.originalname.split("_");
    const user_idwithextension = parts[1];
    const user_id = user_idwithextension.split(".")[0];
    
    const namedir =  './uploads/'+ user_id;
    const destination = namedir + '/profile';

    if (fs.existsSync(destination)) {
        // Si existe, elimina la imagen anterior si la hay
        fs.readdirSync(destination).forEach((file) => {
            const filePath = `${destination}/${file}`;
            fs.unlinkSync(filePath);
        });
    }
    
    // Crear directorios recursivamente si no existen
    fs.mkdirSync(destination, { recursive: true });
    callback(null, destination);
}

export const nameImageProfile = (req, file, callback) => {
    callback(null, file.originalname);
}

export const fileFilter = (req, file, callback) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Invalid format file'), false);
    }
    callback(null, true);
}
