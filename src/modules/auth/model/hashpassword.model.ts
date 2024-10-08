export class HashPassword {
    hashPassword: string;
    salt: string;
    
    constructor(hashPassword: string, salt: string) {
        this.hashPassword = hashPassword;
        this.salt = salt;
    }
}