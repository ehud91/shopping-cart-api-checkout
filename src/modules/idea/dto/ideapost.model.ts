import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlpha, MinLength, MaxLength, IsDefined, IsAlphanumeric } from 'class-validator';


export class IdeaPostRequestDto {

    @ApiProperty({ example: "Let's go to play!" })
    @IsDefined()
    @IsString()
    @MaxLength(50)
    @MinLength(10)
    public title: string;

    @ApiProperty({ example: "Let's go to play and have some fun!!!" })
    @IsString()
    @MaxLength(150)
    @MinLength(20)
    public description: string;

}