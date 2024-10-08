export class UserResponseDto {

    public user_id: string
    public username: string;
    public created_time: string;

    constructor(userId: string, username: string, createdAt: string) {
        this.user_id = userId;
        this.username = username;
        this.created_time = createdAt;
    }
}