import {
    Req,
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    HttpCode,
    UsePipes,
    ValidationPipe,
    Query,
    BadRequestException } from  '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    } from '@nestjs/swagger';    
import { StatusCodes } from 'http-status-codes';
import { Constants } from '../main/const/constants.model';
import { ApiResponseDto } from '../main/dto/response.model';
import { CheckoutService } from './checkout.service';
import { Messages } from './const/Messages.model';

import { Request } from 'express';
import { CheckoutDto } from './dto/checkout.model';

@ApiBearerAuth()
@ApiTags('checkout')
@Controller(Constants.API_VERSION + 'auth')
export class CheckoutController {

    constructor(private checkoutService: CheckoutService) {}

    @Post('/products') 
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Checkout page, save checkout form' })
    @ApiResponse({
        status: StatusCodes.OK,
        description: 'Ok, Successfully saved checkout form.',
        schema: {
            example: 
            {
                "success": "True",
                "message": "You logged in successfully; you can now access the services using the created token",
                "data": {
                    "userId": "54f04ed4-98a2-4d5f-a8ae-7b1da42ed9bf",
                    "user_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNTRmMDRlZDQtOThhMi00ZDVmLWE4YWUtN2IxZGE0MmVkOWJmIiwiaWF0IjoxNzI2Njg0NjE2LCJleHAiOjE3MjkyNzY2MTZ9.Mx0vfoaPuXiWBdo9OBqLY_KOCNn8ZygYLBlUziwq0nw"
                },
                "status": StatusCodes.OK
            }
        },
      })
    @ApiResponse({ 
        status: StatusCodes.BAD_REQUEST, 
        description: 'Bad Request, User not found',
        schema: {
            example: 
            {
                "message": "We didn't found your requested user",
                "error": "We didn't found your requested user",
                "statusCode": StatusCodes.BAD_REQUEST
            }
          },
    })
    @ApiResponse({ 
        status: StatusCodes.INTERNAL_SERVER_ERROR, 
        description: 'InternalServerError, Oops... something went wrong',
        schema: {
            example: 
            {
                "success": "False",
                "message": "Oops... something went wrong... , we could not get the requested user, please try again later...",
                "data": [],
                "status": StatusCodes.INTERNAL_SERVER_ERROR
            }
        }
    })
    @HttpCode(StatusCodes.OK)
    async checkout(@Body() checkout: CheckoutDto, @Req() request: Request) {

        let userResult: any;
        
        try {
            const results = await this.checkoutService.checkout(
                        checkout.fullname, checkout.address, checkout.email, {});
            if (results != null) {
                return new ApiResponseDto(
                    Constants.SUCCESS_TRUE, 
                    Messages.GET_USER_ALREADY_SIGNIN_SUCCESS,
                    {},
                    StatusCodes.OK);
            }            
        } catch (error) {
        
            // Exception error
            console.error(Messages.GET_USER_LOGIN_ERROR, error);
            //this.logger.writeLog(LogTypes.EXCEPTION, 'Get User', error);
            return new ApiResponseDto(
                Constants.SUCCESS_FALSE, 
                Messages.GET_USER_LOGIN_FAILED,
                [],
                StatusCodes.INTERNAL_SERVER_ERROR);
        }    
  
        return new ApiResponseDto(
            Constants.SUCCESS_TRUE, 
            Messages.GET_USER_SIGNIN_SUCCESS,
            {},
            StatusCodes.OK);
    
    }
}