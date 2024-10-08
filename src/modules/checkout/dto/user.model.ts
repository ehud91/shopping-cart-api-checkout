import { IsUUID, IsString } from 'class-validator';


export class UserRequestDto {

    @IsUUID()
    @IsString()
    public userId: string;
}