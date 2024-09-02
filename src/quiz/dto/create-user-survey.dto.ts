import { IsEnum, IsString } from 'class-validator';
import { SurveyType } from '../entities/userSurvey.entity';

export class CreateUserSurveyDto {
  @IsString()
  response: string;

  @IsString()
  surveyId: string;

  @IsEnum(SurveyType)
  type: SurveyType;
}
