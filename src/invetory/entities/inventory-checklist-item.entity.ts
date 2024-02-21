import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Inventory } from "./inventory.entity";
import { Question } from "./question.entity";

@Entity({ name: 'inventory_checklist_item' })
export class InventoryChecklistItem {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    response: string

    @ManyToOne(
        () => Inventory,
        (i) => i.inventoryCheckList,
    )
    inventory: Inventory

    @ManyToOne(
        () => Question,
        (q) => q.inventoryCheckListRef
    )
    question: Question

}
