import { IsString } from "class-validator"

export class CreateUserSurveyDto{
    
    @IsString()
    response: string

    @IsString()
    surveyId: string
}