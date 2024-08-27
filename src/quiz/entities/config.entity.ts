import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('configs')
export class Config {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  value: boolean;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;
}
