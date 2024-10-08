import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Model } from 'mongoose';
import { JwtUser, JwtConfig, JwtModel } from "./model/jwt.model";
import { ConfigService } from "@nestjs/config";
import { HashPassword } from "./model/hashpassword.model";
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { promisify } from 'util';
import { TokenDecoded } from "./model/tokendecoded.model";
const jwt = require('jsonwebtoken');

// Default Auth configurations 
const SALT_ROUND_NUMBER_CONFIG = 10;
const ONE_MINUT_LOGOUT_JWT_EXPIRE = '1m';

const CONFIG_PARAM_JWT_EXPIRES_IN = 'JWT_EXPIRES_IN';
const CONFIG_PARAM_JWT_ALGORITHM = 'JWT_ALGORITHM';
const CONFIG_PARAM_JWT_SECRET = 'JWT_SECRET';


@Injectable()
export class AuthService {


    constructor(private configService: ConfigService) {}


    async createToken(userId: string, isExpire: boolean): Promise<string> {
        
        const jwtData: JwtModel = this.addJwtData(userId, isExpire);

        const jwtSigned = jwt.sign(
            { data: jwtData.JwtUser.userId }, 
            jwtData.secret, { 
                expiresIn: jwtData.jwtConfig.expiresIn, 
                algorithm: jwtData.jwtConfig.algorithm 
        });
        return jwtSigned;
    }

    async validateToken(req: Request): Promise<TokenDecoded> {

        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return null;
        }

        try {
            // Verify token
            const decodeToken: any = await promisify(jwt.verify)(token, this.configService.get<string>('JWT_SECRET'));
            return new TokenDecoded(decodeToken.data, token);
        } catch(error) {
            console.error('Json Token expired!');
            return null;
        }
        
    }


    addJwtData(userId: string, isExpire: boolean): JwtModel {
        
        const expireTime: string = (isExpire) 
                ? ONE_MINUT_LOGOUT_JWT_EXPIRE 
                : this.configService.get<string>(CONFIG_PARAM_JWT_EXPIRES_IN);

        const jwtUser: JwtUser = new JwtUser(userId);

        const jwtConfig: JwtConfig = new JwtConfig(
            this.configService.get<string>(CONFIG_PARAM_JWT_ALGORITHM),
            expireTime
        );

        const jwtModel: JwtModel = new JwtModel(
            jwtUser,
            this.configService.get<string>(CONFIG_PARAM_JWT_SECRET),
            jwtConfig
        );

        return jwtModel
    }


    async encryptPassword(password: string): Promise<HashPassword> {
        
        const saltRound: number = SALT_ROUND_NUMBER_CONFIG;
        const salt: string = await bcrypt.genSalt(saltRound);
        const hashPassword: string = await bcrypt.hash(password, salt);
        return new HashPassword(hashPassword, salt);
    }

    async validatePassword(password: string, dbPassword: string, salt: string) : Promise<boolean> {

        const hashPassword = await bcrypt.hash(password, salt);
        const match: boolean = await bcrypt.compare(password, dbPassword);
        return match;
    }
}