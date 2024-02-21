import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { AuthModule } from 'src/auth/auth.module';
import { InventoryModule } from 'src/invetory/inventory.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    VehicleModule,
    AuthModule,
    InventoryModule
  ]
})
export class SeedModule { }
