import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Inventory } from './entities/inventory.entity';
import { InventoryChecklistItem } from './entities/inventory-checklist-item.entity';
import { Question } from './entities/question.entity';
import { GeneralInventory } from './entities/general-inventory.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService],
  imports: [
    TypeOrmModule.forFeature([
      Inventory,
      InventoryChecklistItem,
      Question,
      GeneralInventory,
    ]),
    AuthModule,
  ],
  exports: [InventoryService, TypeOrmModule],
})
export class InventoryModule {}
