import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SurveyOption } from './surveyOption.entity';
import { UserSurvey } from './userSurvey.entity';

@Entity('surveys')
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type:'text',
    nullable: false
  })
  question: string;

  @Column({
    type: 'boolean',
    default: false
  })
  isFirstSurvey: boolean;

  @OneToMany(()=> SurveyOption, (surveyOption)=> surveyOption.survey )
  surveyOptions: SurveyOption[]

  @OneToMany(()=> UserSurvey, (userSurvey)=> userSurvey.survey)
  userSurveys: UserSurvey[]
}
