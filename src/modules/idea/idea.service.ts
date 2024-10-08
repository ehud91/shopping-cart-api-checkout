import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from "uuid";
import { Idea } from './entity/idea.entity';
import { Model } from 'mongoose';



@Injectable()
export class IdeaService {


    constructor(@InjectModel(Idea.name) private ideaModel: Model<Idea>) {}

    async insertIdea(title: string, description: string): Promise<Idea> {
        
        let ideaResult: any = null; 
        try {
            ideaResult = await this.ideaModel.create({ title, description });
            ideaResult.save();
            return (ideaResult) ? ideaResult : null;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    async getIdeas(): Promise<Idea[]> {
        let ideasResult: any = []; 
        try {
            ideasResult = await this.ideaModel.find().exec();
            return (ideasResult && ideasResult.length > 0) ? ideasResult : [];
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getIdea(ideaId: string): Promise<Idea> {
        let ideaResult: any = []; 
        try {
            ideaResult = await this.ideaModel.findOne({ ideaId });
            return (ideaResult) ? ideaResult : null;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateIdea(ideaId: string, title: string, description: string): Promise<Idea | any> {
        
        const filter: object = { ideaId:  ideaId };
        const updateFields: object = { title: title, description: description };
        
        let ideaResult: any = false; 
        try {
            ideaResult = await this.ideaModel.findOneAndUpdate(filter, updateFields, { new : true });
            return (ideaResult) ? ideaResult : null;
        } catch (error) {
            console.log('error', error);
            throw new InternalServerErrorException(error);
        }
    }

    async deleteIdea(ideaId: string): Promise<Idea> {
        let ideaResult: any; 
        try {
            const idea: Idea = await this.getIdea(ideaId);
            if (idea) {
                ideaResult = await this.ideaModel.findByIdAndDelete(idea._id).exec();
                return idea;
            } else {
                return null;
            }
        } catch (error) {
            console.log('error: ', error);
            throw new InternalServerErrorException(error);
        }
    }


}