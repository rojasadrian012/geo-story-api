import { v4 as uuid } from 'uuid'

export const fileNamer = (
    res: Express.Request,
    file: Express.Multer.File,
    callback: Function
) => {

    if (!file) return callback(new Error('No hay imagenes.'), false)

    const fileExtension = file.mimetype.split('/')[1]
    const fileName = `${uuid()}.${fileExtension}`

    return callback(null, fileName)

}