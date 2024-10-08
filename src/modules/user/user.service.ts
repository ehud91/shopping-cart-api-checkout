import { Injectable, Inject, InternalServerErrorException  } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponseDto } from "./dto/userresponse.model";
import { User } from './entity/user.entity';
import { AuthService } from '../auth/auth.service';
import { HashPassword } from "../auth/model/hashpassword.model";


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>, private authService: AuthService) {}


    async signin(username: string, password: string) : Promise<Document | User | InternalServerErrorException> {

        let ideaResult: any = null; 
        try {

            ideaResult = await this.userModel.findOne({ username });
            
            if (ideaResult == null) {
                console.info('User not found');
                return null;
            }

            const match: boolean = await this.authService.validatePassword(password, ideaResult.password, ideaResult.salt);
            
            if (match) { return ideaResult; }
            else { return null; }

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    async register(username: string, password: string) : Promise<Document | User> {

        let ideaResult: Document = null; 
        try {
            ideaResult = await this.userModel.findOne({ username });
            
            if (ideaResult) {
                console.info('User is already exist');
                return null;
            } else {

                const hashPassword: HashPassword = await this.authService.encryptPassword(password);
                password = hashPassword.hashPassword;
                const salt: string = hashPassword.salt; 

                // register user
                 let createResult: Document | User  = await this.userModel.create({ username, password, salt });
                createResult.save();
                return createResult;
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async logout(userId: string) : Promise<Document> {

        let ideaResult: Document = null; 
        try {
            ideaResult = await this.userModel.findOne({ userId });
            
            if (ideaResult) {
                return ideaResult;
            } else {
                console.info('user not found');
                return null;
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}