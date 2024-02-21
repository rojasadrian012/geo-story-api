import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { InventoryChecklistItem } from "./inventory-checklist-item.entity";

@Entity({ name: 'questions' })
export class Question {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    questionText: string

    @OneToMany(
        () => InventoryChecklistItem,
        (i) => i.question,
    )
    inventoryCheckListRef: InventoryChecklistItem

}
