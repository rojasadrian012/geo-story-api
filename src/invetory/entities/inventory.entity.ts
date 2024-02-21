import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { InventoryChecklistItem } from './inventory-checklist-item.entity';
import { GeneralInventory } from './general-inventory.entity';

@Entity({ name: 'inventorys' })
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  status: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  observation: string;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  kilometers: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Vehicle, (v) => v.inventory)
  vehicle: Vehicle;

  @ManyToOne(() => User, (u) => u.inventory_created)
  creatorUser: User;

  @ManyToOne(() => User, (u) => u.inventory_editor)
  lastUserEdited?: User;

  @OneToMany(() => InventoryChecklistItem, (i) => i.inventory)
  inventoryCheckList: InventoryChecklistItem;

  @OneToMany(() => GeneralInventory, (gi) => gi.beforeChange)
  beforeInvetoryRef: GeneralInventory;

  @OneToMany(() => GeneralInventory, (gi) => gi.afterChange)
  afterInvetoryRef: GeneralInventory;
}
