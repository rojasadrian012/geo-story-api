import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('configs')
export class Config {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  firstSurvey: string;
}
