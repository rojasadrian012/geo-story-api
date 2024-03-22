import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {

    @IsString()
    // @IsEmail()
    nickname: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
        message: 'The password must have a lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(1)
    fullName: string
}