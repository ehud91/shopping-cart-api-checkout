export class IdeaResponseDto {

    public ideaId: string;
    public title: string;
    public descriotion: string;

    constructor(ideaId: string, title: string, description: string) {
        this.ideaId = ideaId;
        this.title = title;
        this.descriotion = description;
    }
}