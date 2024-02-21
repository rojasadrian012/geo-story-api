import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Inventory } from './inventory.entity';
import { Question } from './question.entity';

@Entity({ name: 'general_inventories' })
export class GeneralInventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Inventory, (i) => i.inventoryCheckList)
  beforeChange: Inventory;

  @ManyToOne(() => Inventory, (i) => i.afterInvetoryRef, { nullable: true })
  afterChange: Inventory;
}
