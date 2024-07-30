import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

    // @Column({
    //     type: 'text',
    //     nullable: true
    // })
    // icon: string //TODO: implementar path de la imagen    
}