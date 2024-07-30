import { join } from 'path';
import { existsSync } from 'fs';

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {

    //se podria recibir el nombre de la cartepa para saber donde buscar.
    getStaticVehicleImage(imageName: string) {

        const path = join(__dirname, '../../static/vehicles', imageName)

        if (!existsSync(path))
            throw new BadRequestException(`La imagen ${imageName} no se encontró.`)

        return path
    }

}
