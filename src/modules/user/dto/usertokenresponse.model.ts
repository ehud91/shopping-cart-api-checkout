export class UserTokenResponseDto {

    public userId: string;
    public user_token: string;

    constructor(userId: string, 
                userToken: string) {
                    
        this.userId = userId;
        this.user_token = userToken;
    }
}