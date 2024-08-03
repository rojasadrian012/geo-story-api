import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { UserAchievement } from "./userAchievement"

@Entity('achievements')
export class Achievement {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'text',
        nullable: false
    })
    name: string

    @Column({
        type: 'text',
        nullable: true
    })
    description: string

    @Column({
        type: 'text',
        nullable: true
    })
    image: string

    @OneToMany(() => UserAchievement, (userAchievement) => userAchievement.achievement)
    userAchievements: UserAchievement[]
}