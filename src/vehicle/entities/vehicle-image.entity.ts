import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";

@Entity({ name: 'vehicle_images' })
export class VehicleImage {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text'
    })
    url: string

    @ManyToOne(
        () => Vehicle,
        (vehicle) => vehicle.images,
        { onDelete: 'CASCADE' }
    )
    vehicle: Vehicle
}