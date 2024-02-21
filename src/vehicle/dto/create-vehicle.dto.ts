import { IsArray, IsOptional, IsString } from "class-validator"

export class CreateVehicleDto {
    @IsString()
    model: string

    @IsString()
    brand: string

    @IsString()
    color: string

    @IsString()
    chassis: string

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[]
}
