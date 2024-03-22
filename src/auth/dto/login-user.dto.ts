import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class LoginUserDto {

    @IsString()
    // @IsEmail()
    nickname: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
        message: 'The password must have lowercase letter and a number'
    })
    password: string;

}