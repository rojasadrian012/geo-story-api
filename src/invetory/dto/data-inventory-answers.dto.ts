import { IsArray, IsObject, IsString, IsUUID } from "class-validator";


interface Question {
    id: string;
    questionText: string;
}

interface Answer {
    response: string;
    question: Question;
}

export class DataInventoryAnswersDto {

    @IsUUID()
    inventoryId: string;

    @IsArray()
    answers: Answer[];
}

