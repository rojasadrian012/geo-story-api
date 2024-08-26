import { IsString } from "class-validator";

export class CreateSurveyDto{

    @IsString()
    question: string

    @IsString()
    response: string

    options: TypeOptions[]
}


interface TypeOptions {
    name: string;
    value: string;
}