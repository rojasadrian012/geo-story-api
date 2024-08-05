import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { Achievement } from './achievement.entity';

@Entity('user-achievements')
export class UserAchievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  date: Date;

  @ManyToOne(() => User, (user) => user.userAchievements)
  user: User;

  @ManyToOne(() => Achievement, (achievement) => achievement.userAchievements)
  achievement: Achievement;
}
