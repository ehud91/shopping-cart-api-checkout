import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsEmail, IsOptional, IsDefined, IsNotEmpty } from 'class-validator';


export class UserSignUpDto {

    @ApiProperty({ example: 'johndoe2@gmail.com' })
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public username: string;

    @ApiProperty({ example: 'johndoe2@johndoe123456XXX' })
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public password: string

    @ApiProperty({ example: 'admin' })
    @IsOptional()
    @IsString()
    public role?: string
}