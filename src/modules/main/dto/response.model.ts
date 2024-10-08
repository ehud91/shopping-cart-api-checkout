export class ApiResponseDto {
    public success: string;
    public message: string;
    public data: object;
    public status: number;

    constructor(success: string, 
                message: string, 
                data: object, 
                status: number) {
                    
        this.success = success;
        this.message = message;
        this.data = data;
        this.status = status;
    }
}