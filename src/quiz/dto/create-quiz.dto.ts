import { IsString } from "class-validator";

export class CreateQuizDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    difficulty: number;
}
