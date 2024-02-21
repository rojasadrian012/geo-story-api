import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleImage } from './entities/vehicle-image.entity';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService],
  imports: [
    TypeOrmModule.forFeature([
      Vehicle,
      VehicleImage
    ]),
    AuthModule,
  ],
  exports: [
    VehicleService,
    TypeOrmModule,
  ]
})
export class VehicleModule { }
