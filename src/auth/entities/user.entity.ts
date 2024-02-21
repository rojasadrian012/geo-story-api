import {
  AfterUpdate,
  BeforeInsert,
  Collection,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column({
    type: 'text',
  })
  fullName: string;

  @Column({
    type: 'bool',
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'text',
    array: true,
    default: ['user'],
    // select:false
  })
  roles: string[];

  @BeforeInsert()
  toLowerCaseAndRemoveSpaceBefore() {
    this.email = this.email.toLowerCase().trim();
  }

  @AfterUpdate()
  toLowerCaseAndRemoveSpaceAfter() {
    this.toLowerCaseAndRemoveSpaceBefore();
  }
}
