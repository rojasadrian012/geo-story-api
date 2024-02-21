import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { VehicleImage } from './vehicle-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { Inventory } from 'src/invetory/entities/inventory.entity';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text')
  model: string;

  @ApiProperty()
  @Column('text')
  brand: string;

  @ApiProperty()
  @Column('text')
  color: string;

  @ApiProperty()
  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  chassis: string;

  @ApiProperty()
  @OneToMany(() => VehicleImage, (vehicleImage) => vehicleImage.vehicle, {
    cascade: true,
  })
  images?: VehicleImage[];

  @ManyToOne(() => User, (user) => user.vehicle, { nullable: true })
  user: User;

  @OneToMany(() => Inventory, (i) => i.vehicle)
  inventory: Inventory;

  @BeforeUpdate()
  @BeforeInsert()
  checkChassis() {
    this.chassis = this.chassis.toLocaleUpperCase().trim();
  }
}
