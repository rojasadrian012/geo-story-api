import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Question } from "./question.entity"

@Entity('answers')
export class Answer {
    @PrimaryGeneratedColumn('uuid')
    id: string
       
    @Column({
        type: 'text',
        nullable: false
    })
    text: string

    @Column({
        type: 'boolean',
        default: false, 
        nullable: false
    })
    isCorrect: boolean
    
    @ManyToOne(() => Question, (question) => question.answers)
    question: Question
}