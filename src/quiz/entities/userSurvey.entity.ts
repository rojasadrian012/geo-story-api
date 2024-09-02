import { User } from 'src/auth/entities/user.entity';
import { Survey } from './survey.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum SurveyType {
  FIRST = 'first',
  SECOND = 'second',
}

@Entity('user-surveys')
export class UserSurvey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  response: string;

  @Column({
    type: 'enum',
    enum: SurveyType,
    nullable: false,
  })
  type: SurveyType;

  @ManyToOne(() => Survey, (survey) => survey.userSurveys)
  survey: Survey;

  @ManyToOne(() => User, (user) => user.userSurveys)
  user: User;
}
