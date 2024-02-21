import { diskStorage } from 'multer';
import { Response } from 'express';

import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FilesService } from './files.service';
import { fileFilterRef } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';


@ApiTags('File')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) { }

  @Get('vehicle/:imageName')
  findVehicleImageByID(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticVehicleImage(imageName)

    res.sendFile(path)
  }

  @Post('vehicle')
  @UseInterceptors(FileInterceptor(
    'vehicleImg',
    {
      fileFilter: fileFilterRef,
      // limits: { fileSize: 1000 } //tamaño de la imagen
      storage: diskStorage({
        destination: './static/vehicles',
        filename: fileNamer,
      })
    }))
  uploadImageVehicle(
    @UploadedFile() file: Express.Multer.File
  ) {

    if (!file) {
      throw new BadRequestException('Asegúrese de el archivo sea una imagen.')
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/vehicle/${file.filename}`

    return { secureUrl }
  }

}
