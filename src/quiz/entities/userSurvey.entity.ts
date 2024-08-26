import { User } from 'src/auth/entities/user.entity';
import { Survey } from './survey.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user-surveys')
export class UserSurvey{

    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type:'text',
        nullable: false
    })
    response: string;

    @ManyToOne(() => Survey, (survey)=> survey.userSurveys)
    survey: Survey;

    @ManyToOne(()=> User, (user)=> user.userSurveys)
    user: User
}