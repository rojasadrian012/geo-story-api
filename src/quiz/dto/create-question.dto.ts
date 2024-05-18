import { IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    hint: string;

    quiz: Quiz;
}

interface Quiz {
    id: string;
    title: string;
    description: string;
    difficulty: string;
}   