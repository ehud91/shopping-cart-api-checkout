export class UserStoreDto {

    public userId: string;
    public character: string;
    public number: number;

    constructor(userId: string, 
                character: string, 
                number: number) {
                    
        this.userId = userId;
        this.character = character;
        this.number = number;
    }
}