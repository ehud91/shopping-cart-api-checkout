import { Injectable, NestMiddleware, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from "@nestjs/config";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StatusCodes } from "http-status-codes";
import { jwt } from 'jsonwebtoken';
import { promisify } from 'util';
import { User } from '../../user/entity/user.entity';
import { Constants } from '../const/constants.model';
import { ApiResponseDto } from '../dto/response.model';
const jwt = require('jsonwebtoken');


const BEARER_TOKEN = 'Bearer';

@Injectable()
export class AuthMidelware implements NestMiddleware {


    constructor(@InjectModel(User.name) private userModel: Model<User>, private configService: ConfigService) {}

    async use(req: Request, res: Response, next: NextFunction) {

        let token: string = null;
        if (req.headers.authorization && req.headers.authorization.startsWith(BEARER_TOKEN)) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (token == null) {
            console.error(`Validation Error: Authentication check failed - error in token, token={${token}}`);
        
            res.status(StatusCodes.UNAUTHORIZED)
                .json(new ApiResponseDto(
                    Constants.SUCCESS_FALSE, 
                    'You are not logged in! Please login to continue',
                    {},
                    StatusCodes.UNAUTHORIZED))
                .send();
                return;
        }

        let decodeToken: any = null;
        try {
            // Verify token
            decodeToken = await promisify(jwt.verify)(token, this.configService.get<string>('JWT_SECRET'));
        } catch (error) {
            console.error(`Validation Error: Authentication check failed - Not a valid token, decodeId={${token}}`);
            res.status(StatusCodes.UNAUTHORIZED)
                .json(new ApiResponseDto(
                    Constants.SUCCESS_FALSE, 
                    'Your token is not valid, please try to signin again in order to use the service',
                    {},
                    StatusCodes.UNAUTHORIZED)).send(); 
            return;
        } 

        let searchUser: User = null;
        const userId: string = decodeToken.data;
        
        try {
            searchUser = await this.userModel.findOne({ userId });
        } catch(error) {
            console.error(`UnExpectedError: Could not find the requested user by the decodedToken.id={${decodeToken.data}}`);
            throw new InternalServerErrorException('Oops... something went wrong');
        }

        if (searchUser == null) {
            console.error(`Validation Error: Authentication check failed - Could not find user id by token, decodeId={${decodeToken.id}}`);
            res.status(StatusCodes.UNAUTHORIZED)
                .json(new ApiResponseDto(
                    Constants.SUCCESS_FALSE, 
                    'Your token is not valid or expired, please try to signin again in order to use the service',
                    {},
                    StatusCodes.UNAUTHORIZED)).send(); 
            return;
            
        }

        next();
    }
}