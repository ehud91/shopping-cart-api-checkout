export class TokenDecoded {
    userId: string;
    token: string;
    
    constructor(userId: string, token: string) {
        this.userId = userId;
        this.token = token;
    }
}