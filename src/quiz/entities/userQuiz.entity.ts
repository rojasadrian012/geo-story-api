import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Quiz } from './quiz.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity('user-quizzes')
export class UserQuiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'numeric',
    default: 0,
  })
  score: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  dataScore: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  unlockLevel: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  completed: boolean;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.userQuiz)
  user: User;
}
