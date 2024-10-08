import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlpha, MinLength, MaxLength, IsDefined, IsUUID } from 'class-validator';


export class IdeaPutRequestDto {

    @ApiProperty({ example: '620314ba-f649-4e32-8e6b-e375e2e9c736' })
    @IsDefined()
    @IsUUID()
    @IsString()
    @MaxLength(50)
    @MinLength(10)
    public ideaId: string;

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