import { IsString, IsUUID } from 'class-validator';


export class IdeaGetRequestDto {

    @IsUUID()
    @IsString()
    public ideaId: string;
}