import { UserAchievement } from 'src/quiz/entities/userAchievement';
import { UserQuiz } from 'src/quiz/entities/userQuiz.entity';
import {
  AfterUpdate,
  BeforeInsert,
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
  nickname: string;

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

  @OneToMany(
    () => UserQuiz,
    (userQuiz) => userQuiz.user,
  )
  userQuiz: UserQuiz[];

  @OneToMany(
    () => UserAchievement,
    (userAchievement) => userAchievement.user,
  )
  userAchievements: UserAchievement[];

  @BeforeInsert()
  toLowerCaseAndRemoveSpaceBefore() {
    this.nickname = this.nickname.toLowerCase().trim();
  }

  @AfterUpdate()
  toLowerCaseAndRemoveSpaceAfter() {
    this.toLowerCaseAndRemoveSpaceBefore();
  }
}
