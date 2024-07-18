import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity('quizzes')
export class Quiz {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    title: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @Column({
        type: 'numeric',
        nullable: true,
    })
    difficulty: number;

    @OneToMany(
        () => Question,
        (question) => question.quiz,
        // { onDelete: 'CASCADE' }
    )
    questions: Question[]
}
