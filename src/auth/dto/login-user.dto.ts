import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class LoginUserDto {

    @IsString()
    // @IsEmail()
    nickname: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /^(?=.*[a-zA-Z0-9]).*$/, {
        message: 'La contraseña debe tener al menos una letra o un número.'
    })
    
    password: string;

}