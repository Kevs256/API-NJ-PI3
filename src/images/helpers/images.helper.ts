/* eslint-disable prettier/prettier */
export const renameImageProfile = (req, file, callback)=>{
    const initialName = "Profile-";
    const userId = req.body.user_id;
    const fileName = `${initialName}${userId}`;
    callback(null, fileName);
}

export const destinationImageProfile = (req, file, callback)=>{
    const destination = "../uploads/${req.body.user_id}/profile";
    callback(null, destination);
}