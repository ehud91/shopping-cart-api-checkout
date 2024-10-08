import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsDefined, IsNotEmpty } from 'class-validator';


export class CheckoutDto {

    @ApiProperty({ example: 'johndoe2@gmail.com' })
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public fullname: string;

    @ApiProperty({ example: 'Bugrashov st. 90 Tel-Aviv' })
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public address: string

    @ApiProperty({ example: 'johndoe@gmail.com' })
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email: string
}