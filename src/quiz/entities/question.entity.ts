import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./quiz.entity";
import { Answer } from "./answer.entity";

@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        nullable: false
    })
    title: string;

    @Column({
        type: 'text',
        nullable: true
    })
    hint: string;

    @ManyToOne(() => Quiz, quiz => quiz.questions)
    quiz: Quiz

    @OneToMany(
        () => Answer,
        answer => answer.question,
        // { onDelete: 'CASCADE' }
    )
    answers: Answer[]
}