import { error } from "console"

export const fileFilterRef = (
    res: Express.Request,
    file: Express.Multer.File,
    callback: Function
) => {

    if (!file) return callback(new Error('No hay imagenes.'), false)

    const fileExtension = file.mimetype.split('/')[1]
    const validFormatImage = ['jpg', 'jpeg', 'png']

    if (validFormatImage.includes(fileExtension)) {
        return callback(null, true)
    }

    return callback(null, false)

}