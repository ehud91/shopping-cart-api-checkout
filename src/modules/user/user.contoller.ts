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
import { UserService } from './user.service';
import { UserRequestDto } from './dto/user.model';
import { Messages } from './const/Messages.model';
import { UserStoreDto } from './dto/userstore.model';
import { UserSignInDto } from './dto/usersignin.model';
import { UserSignUpDto } from './dto/usersignup.model';
import { User } from './entity/user.entity';
import { AuthService } from '../auth/auth.service';
import { UserResponseDto } from './dto/userresponse.model';
import { UserTokenResponseDto } from './dto/usertokenresponse.model';
import { Request } from 'express';
import { TokenDecoded } from '../auth/model/tokendecoded.model';

@ApiBearerAuth()
@ApiTags('auth')
@Controller(Constants.API_VERSION + 'auth')
export class UserController {

    constructor(private userService: UserService, private authService: AuthService) {}

    @Post('/login') 
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Login to system' })
    @ApiResponse({
        status: StatusCodes.OK,
        description: 'Ok, Successfully user login.',
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
    async login(@Body() userSignIn: UserSignInDto, @Req() request: Request) {

        let userResult: any;
        
        try {
            const validateToken: TokenDecoded = await this.authService.validateToken(request);
            if (validateToken != null) {
                return new ApiResponseDto(
                    Constants.SUCCESS_TRUE, 
                    Messages.GET_USER_ALREADY_SIGNIN_SUCCESS,
                    new UserTokenResponseDto(validateToken.userId, validateToken.token),
                    StatusCodes.OK);
            } 

            userResult = await this.userService.signin(userSignIn.username, userSignIn.password);
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

        // User not found
        if (userResult == null) {
            //this.logger.writeLog(LogTypes.ERROR, 'Get User', 'User not found');
            throw new BadRequestException(Messages.USER_NOT_FOUND, 
                { cause: new Error(), description: Messages.USER_NOT_FOUND })
        }

        const jwtToken: any = await this.authService.createToken(userResult.userId, false);
            
        return new ApiResponseDto(
            Constants.SUCCESS_TRUE, 
            Messages.GET_USER_SIGNIN_SUCCESS,
            new UserTokenResponseDto(userResult.userId, jwtToken),
            StatusCodes.OK);
    
    }

    @Get('/logout') 
    @ApiOperation({ summary: 'Logout from system' })
    @ApiResponse({
        status: StatusCodes.OK,
        description: 'Ok, Successfully user login.',
        schema: {
            example: 
            {
                "success": "True",
                "message": "You are now logged out",
                "data": {},
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
                "error": "User was not found",
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
    async logout(@Query('userId') userId: string) {

        let userResult: any;
        
        try {
            userResult = await this.userService.logout(userId);
        } catch (error) {
        
            // Exception error
            console.error(Messages.GET_USER_LOGOUT_ERROR, error);
            //this.logger.writeLog(LogTypes.EXCEPTION, 'Get User', error);
            return new ApiResponseDto(
                Constants.SUCCESS_FALSE, 
                Messages.GET_USER_LOGOUT_FAILED,
                [],
                StatusCodes.INTERNAL_SERVER_ERROR);
        }    

        // User not found
        if (userResult == null) {
            //this.logger.writeLog(LogTypes.ERROR, 'Get User', 'User not found');
            throw new BadRequestException(Messages.USER_NOT_FOUND_USER_MESSAGE, 
                { cause: new Error(Messages.USER_NOT_FOUND), description: Messages.USER_NOT_FOUND })
        }

        const expiredJwtToken: any = this.authService.createToken(userResult.userId, true);
            
        //this.logger.writeLog(LogTypes.INFO, 'Get User', 'User found with both character and number');
        return new ApiResponseDto(
            Constants.SUCCESS_TRUE, 
            Messages.GET_USER_LOGOUT_SUCCESS,
            expiredJwtToken,
            StatusCodes.OK);
    
    }

    @Post('/signup') 
    @ApiOperation({ summary: 'SignUp to system in the first time' })
    @ApiResponse({
        status: StatusCodes.OK,
        description: 'Ok, Successfully user login.',
        schema: {
            example: 
            {
                "success": "True",
                "message": "You are now registered, please login in order to use the service",
                "data": {
                    "user_id": "b4b9f81a-1c3a-418b-816a-6c2bb0b294d7",
                    "username": "ehud91@gmail.com",
                    "created_time": "2024-09-18T19:25:43.148Z"
                },
                "status": StatusCodes.OK
            }
        },
      })
      @ApiResponse({
        status: StatusCodes.BAD_REQUEST,
        description: 'Bad Request, User Already been registered',
        schema: {
            example: 
            {
                "message": "The requested user is already exist, you cannot register with the same user, please try to register with another user (email)",
                "error": "The user is already exist, cannot register with the same user",
                "statusCode": StatusCodes.BAD_REQUEST
            }
        },
      })
      @ApiResponse({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        description: 'Bad Request, User Already been registered',
        schema: {
            example: 
            {
                "success": "False",
                "message": "Oops... something went wrong... , we could not register the requested user, please try again later...",
                "data": [],
                "status": StatusCodes.INTERNAL_SERVER_ERROR
            }
        },
      })
    @HttpCode(StatusCodes.OK)
    async signup(@Body() user: UserSignUpDto) {

        let userResult: any;
        
        try {
            userResult = await this.userService.register(user.username, user.password);
        } catch (error) {
        
            // Exception error
            console.error(Messages.GET_USER_REGISTER_ERROR, error);
            //this.logger.writeLog(LogTypes.EXCEPTION, 'Get User', error);
            return new ApiResponseDto(
                Constants.SUCCESS_FALSE, 
                Messages.GET_USER_FAILED_REGISTER,
                [],
                StatusCodes.INTERNAL_SERVER_ERROR);
        }    

        // User is already exist
        if (userResult == null) {
            //this.logger.writeLog(LogTypes.ERROR, 'Get User', 'User not found');
            throw new BadRequestException(Messages.GET_USER_SIGNUP_EXIST_SUCCESS, 
                { cause: new Error(Messages.USER_ALREADY_EXIST), description: Messages.USER_ALREADY_EXIST })
        }

        const displayUser = new UserResponseDto(
            userResult.userId,
            userResult.username,
            userResult.createdAt
        );
        
        
        //this.logger.writeLog(LogTypes.INFO, 'Get User', 'User found with both character and number');
        return new ApiResponseDto(
            Constants.SUCCESS_TRUE, 
            Messages.GET_USER_SIGNUP_SUCCESS,
            displayUser,
            StatusCodes.OK);
    
    }
}