import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString, IsEmail, IsDefined, minLength, IsNotEmpty } from 'class-validator';


export class UserSignInDto {

    @ApiProperty({ example: 'johndoe2@gmail.com' })
    @IsDefined()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public username: string;

    @ApiProperty({ example: 'johndoe2@johndoe123456XXX' })
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public password: string
}