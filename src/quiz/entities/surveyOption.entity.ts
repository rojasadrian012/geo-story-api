import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Survey } from './survey.entity';

@Entity('survey-options')
export class SurveyOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type:'text',
    nullable: false
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false
  })
  value: string;

  @ManyToOne(()=> Survey, (survey)=> survey.surveyOptions)
  survey: Survey;
}
