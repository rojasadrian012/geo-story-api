import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { Achievement } from './achievement.entity';

@Entity('user-achievements')
export class UserAchievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  date: string;

  @ManyToOne(() => User, (user) => user.userAchievements)
  user: User;

  @ManyToOne(()=> Achievement, (achievement)=> achievement.userAchievements)
  achievement: Achievement;
}
