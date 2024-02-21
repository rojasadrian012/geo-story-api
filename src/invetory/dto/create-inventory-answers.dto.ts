import { IsArray, IsObject, IsString, IsUUID } from "class-validator";
import { Inventory } from "../entities/inventory.entity";


interface Question {
    id: string;
    questionText: string;
}

interface Answer {
    response: string;
    question: Question;
}

export class CreateInventoryAnswersDto {

    @IsString()
    response: string;

    @IsObject()
    inventory: Inventory

    @IsObject()
    question: Question
}

