import { IsNumber, IsObject, IsOptional, IsString, IsUUID } from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { CreateVehicleDto } from "src/vehicle/dto/create-vehicle.dto";

export class CreateInvetoryDto {
    @IsString()
    status: string

    @IsString()
    observation: string

    @IsNumber()
    kilometers: number

    @IsObject()
    vehicle: CreateVehicleDto

    @IsObject()
    @IsOptional()
    lastUserEdited?: User

}
