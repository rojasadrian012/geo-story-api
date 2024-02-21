import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';

@ApiTags('Vehiculos')
@Controller('vehicle')
@Auth()
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Vehiculo creado', type: Vehicle })
  create(
    @Body() createVehicleDto: CreateVehicleDto,
    @GetUser() user: User
  ) {
    return this.vehicleService.create(createVehicleDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.vehicleService.findAll(paginationDto);
  }

  @Get('search/:searchTerm')
  findOne(@Param('searchTerm') searchTerm: string) {
    return this.vehicleService.findOnePlain(searchTerm);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @GetUser() user: User
  ) {
    return this.vehicleService.update(id, updateVehicleDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.vehicleService.remove(id);
  }

  @Get('count')
  countVehicle() {
    return this.vehicleService.countVehicles()
  }
}
