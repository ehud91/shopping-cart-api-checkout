import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import { ConfigService } from "@nestjs/config";
import { StatusCodes } from "http-status-codes";


@Injectable()
export class RateLimiterMidelware implements NestMiddleware {

    private timeWindow: number = parseInt(config().rateLimiter.timeWindowBetweenRequests);
    private allowMaxRequests: number = parseInt(config().rateLimiter.allowMaxRequests);
    private clients: { [key: string]: { count: number; timestamp: number} } = {};
    
    constructor(private configService: ConfigService) {}

    
    use(req: Request, res: Response, next: NextFunction) {
        
        const clientIp = req.ip;
        const currentTime = Date.now();

        if (!this.clients[clientIp]) {
            this.clients[clientIp] = { 
                count: 1, 
                timestamp: currentTime 
            };
        } else {
            const timeDifference = (currentTime - this.clients[clientIp].timestamp) / 1000;

            if (timeDifference < this.timeWindow) {
                this.clients[clientIp].count += 1;
            } else {
                this.clients[clientIp].count = 1;
                this.clients[clientIp].timestamp = currentTime;
            }
        }

        if (this.clients[clientIp].count > this.allowMaxRequests) {
            console.error('Too many requests. please try again after ' + this.timeWindow + ' seconds', this.clients);
            return res
                    .status(
                        StatusCodes.TOO_MANY_REQUESTS)
                    .json({ 
                        message: 'Too many requests. please try again after ' + this.timeWindow + ' seconds'});
        }
        
        next();
    }
}