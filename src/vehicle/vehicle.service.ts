import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid'

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Vehicle } from './entities/vehicle.entity';
import { VehicleImage } from './entities/vehicle-image.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class VehicleService {

  private readonly logger = new Logger('VehicleService');

  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(VehicleImage)
    private readonly vehicleImageRepository: Repository<VehicleImage>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createVehicleDto: CreateVehicleDto, user: User): Promise<Vehicle> {
    try {
      const { images = [], ...vehicleDetails } = createVehicleDto;

      const vehicleImages = images.map(imageUrl =>
        this.vehicleImageRepository.create({ url: imageUrl })
      );

      const newVehicle = this.vehicleRepository.create({
        ...vehicleDetails,
        // user: user,
        images: vehicleImages
      });

      await this.vehicleRepository.save(newVehicle);

      return newVehicle;
    } catch (error) {
      this.handleDataBaseExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto

    const vehicles = await this.vehicleRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      }
    })
    return vehicles.map(vehicle => ({
      ...vehicle,
      images: vehicle.images.map(img => img.url)
    }))
  }

  async findOne(searchTerm: string) {//busca por uuid, marca y chassis

    let vehicle: Vehicle

    if (isUUID(searchTerm)) {
      vehicle = await this.vehicleRepository.findOneBy({ id: searchTerm })
    } else {
      const queryBuilder = this.vehicleRepository.createQueryBuilder('vehi')
      vehicle = await queryBuilder
        .where('UPPER(brand) =:brand or chassis =:chassis', {
          brand: searchTerm.toUpperCase(),
          chassis: searchTerm.toLowerCase(),
        })
        .leftJoinAndSelect('vehi.images', 'vehiImages')
        .getOne()
    }


    if (!vehicle)
      throw new NotFoundException(`No se encontro el vehiculo con id: ${searchTerm}.`);

    return vehicle
  }

  async findOnePlain(searchTerm: string) {
    const { images = [], ...restoDelVehiculo } = await this.findOne(searchTerm)
    return {
      ...restoDelVehiculo,
      images: images.map(image => image.url)
    }
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto, user: User) {

    const { images, ...toUpdate } = updateVehicleDto

    const vehicle = await this.vehicleRepository.preload({
      id: id,
      ...toUpdate
    })

    if (!vehicle) {
      throw new NotFoundException(`Vehiculo con id: ${id} no se ha encontrado.`);
    }

    //QueryRunner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      if (images) {
        await queryRunner.manager.delete(VehicleImage, { vehicle: { id } })
        vehicle.images = images.map(
          imageUrl => this.vehicleImageRepository.create({ url: imageUrl })
        )
      }

      vehicle.user = user;
      await queryRunner.manager.save(vehicle);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id)

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDataBaseExceptions(error)
    }

  }

  async remove(id: string) {
    const vehicle = await this.findOne(id)
    await this.vehicleRepository.remove(vehicle)
  }

  async deleteAllVehicles() {
    const query = this.vehicleRepository.createQueryBuilder('vehicle')

    try {
      return await query
        .delete()
        .where({})
        .execute()

    } catch (error) {
      this.handleDataBaseExceptions(error)
    }
  }

  async countVehicles() {
    const total = await this.vehicleRepository.count();
    return total
  }

  private handleDataBaseExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException('Registro ya existe. ' + error.detail)

    this.logger.log(error);
    throw new InternalServerErrorException('Error no registrado, revisar logs del servidor.')
  }
}
