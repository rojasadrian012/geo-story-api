import { Inventory } from "src/invetory/entities/inventory.entity";
import { Vehicle } from "src/vehicle/entities/vehicle.entity";
import { AfterUpdate, BeforeInsert, Collection, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true
    })
    email: string

    @Column({
        type: 'text',
        select: false
    })
    password: string

    @Column({
        type: 'text'
    })
    fullName: string

    @Column({
        type: 'bool',
        default: true
    })
    isActive: boolean

    @Column({
        type: 'text',
        array: true,
        default: ['user'],
        // select:false
    })
    roles: string[]

    @OneToMany(
        () => Vehicle,
        (vehicle) => vehicle.user
    )
    vehicle: Vehicle

    @OneToMany(
        () => Inventory,
        (i) => i.creatorUser
    )
    inventory_created: Inventory

    @OneToMany(
        () => Inventory,
        (i) => i.lastUserEdited
    )
    inventory_editor: Inventory

    @BeforeInsert()
    toLowerCaseAndRemoveSpaceBefore() {
        this.email = this.email.toLowerCase().trim()
    }

    @AfterUpdate()
    toLowerCaseAndRemoveSpaceAfter() {
        this.toLowerCaseAndRemoveSpaceBefore()
    }
}
