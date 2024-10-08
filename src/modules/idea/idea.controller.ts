import {
    Body,
    Controller,
    Get,
    Put,
    Post,
    Patch,
    Delete,
    Param,
    HttpCode,
    UsePipes,
    ValidationPipe,
    Query, 
    Res} from  '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    } from '@nestjs/swagger';  
import { IdeaPutRequestDto } from './dto/ideaput.model'; 
import { IdeaPostRequestDto } from './dto/ideapost.model';
import { IdeaGetRequestDto } from './dto/ideaget.model';
import { IdeaService } from './idea.service';
import { StatusCodes } from 'http-status-codes';
import { Constants } from '../main/const/constants.model';
import { ApiResponseDto } from '../main/dto/response.model';
import { Messages } from './const/Messages.model';
import { Idea } from './entity/idea.entity';
import { IdeaResponseDto } from './dto/idearesponse.model'
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('idea')
@Controller(Constants.API_VERSION + 'idea')
export class IdeaController {
    
    constructor(private ideaService: IdeaService) {}

    @Post('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add new Idea' })
    @ApiResponse({
        status: StatusCodes.OK,
        description: 'Ok, new idea added Successfully',
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
                "message": [
                    "title should not be null or undefined",
                    "title must be longer than or equal to 10 characters",
                    "title must be shorter than or equal to 50 characters",
                    "title must be a string",
                    "title must contain only letters (a-zA-Z)",
                    "description must be longer than or equal to 20 characters",
                    "description must be shorter than or equal to 150 characters",
                    "description must be a string",
                    "description must contain only letters (a-zA-Z)"
                ],
                "error": "Bad Request",
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
                "message": "Oops... something went wrong... , we could not add your requested idea",
                "data": {},
                "status": StatusCodes.INTERNAL_SERVER_ERROR
            }
        }
    })
    @HttpCode(StatusCodes.OK)
    async insertIdea(@Body() IdeaRequest: IdeaPostRequestDto, @Res() res: Response): Promise<ApiResponseDto> {

        try {
            const ideaResult: Idea = 
                    await this.ideaService.insertIdea(
                                    IdeaRequest.title, 
                                    IdeaRequest.description);

            if (ideaResult == null) {                
                res.status(StatusCodes.BAD_REQUEST)
                    .json(
                        new ApiResponseDto(
                            Constants.SUCCESS_FALSE, 
                            Messages.INSERT_NEW_IDEA_FAILED,
                            {},
                            StatusCodes.BAD_REQUEST))
                    .send();  
                    return;                  
            }                        

            const ideaResponseDto = new IdeaResponseDto(
                                            ideaResult.ideaId,
                                            ideaResult.title,
                                            ideaResult.description
            );
            
            //this.logger.writeLog(LogTypes.INFO, 'Set new Character', 'New Character inserted');
            res.status(StatusCodes.OK)
                .json(new ApiResponseDto(
                        Constants.SUCCESS_TRUE, 
                        Messages.INSERT_NEW_IDEA_SUCCESS,
                        ideaResponseDto,
                        StatusCodes.OK))
                .send();     
        } catch (error) {

            //this.logger.writeLog(LogTypes.EXCEPTION, 'Set new Character', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ApiResponseDto(
                    Constants.SUCCESS_FALSE, 
                    Messages.INSERT_NEW_IDEA_FAILED,
                    {},
                    StatusCodes.INTERNAL_SERVER_ERROR))
                .send();     
        }
    }

    @Get('/all')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all ideas' })
    @ApiResponse({
        status: StatusCodes.OK,
        description: 'Ok, Get all ideas',
        schema: {
            example: 
            {
                "success": "True",
                "message": "Get all ideas",
                "data": [
                    {
                        "ideaId": "e0e20ac8-66d8-45de-a922-0ca9c16ae76c",
                        "title": "Let's go to play !",
                        "descriotion": "Have some fun together"
                    },
                    {
                        "ideaId": "e0842c1f-e18b-4ee8-b0ed-63dbf610e77d",
                        "title": "Let's go to work !",
                        "descriotion": "Have a great day at work"
                    },
                    {
                        "ideaId": "e6bfaf08-e0f1-450d-bea2-89b8b1c23fb0",
                        "title": "Let's go to do the task !",
                        "descriotion": "Need to focus on that task..."
                    }
                ],
                "status": StatusCodes.OK
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
                "message": "Oops... something went wrong... , we could not get all ideas",
                "data": [],
                "status": StatusCodes.INTERNAL_SERVER_ERROR
            }
        }
    })
    @HttpCode(StatusCodes.OK)
    async getIdeas(@Res() res: Response): Promise<ApiResponseDto> {

        try {

            const ideaResult: Idea[] = 
                            await this.ideaService.getIdeas();

            if (ideaResult.length <= 0) {                
                res.status(StatusCodes.BAD_REQUEST)
                    .json(
                        new ApiResponseDto(
                            Constants.SUCCESS_FALSE, 
                            Messages.GET_ALL_IDEAS_FAILED,
                            [],
                            StatusCodes.BAD_REQUEST))
                    .send();  
                    return;                  
            }     
            
            let ideas: IdeaResponseDto[] = [];
            ideaResult.forEach(ideaRes => {
                const ideaResponseDto: IdeaResponseDto = new IdeaResponseDto(
                    ideaRes.ideaId,
                    ideaRes.title,
                    ideaRes.description
                ); 
                ideas.push(ideaResponseDto);
            });

            //this.logger.writeLog(LogTypes.INFO, 'Set new Character', 'New Character inserted');
            res.status(StatusCodes.OK)
                .json(new ApiResponseDto(
                    Constants.SUCCESS_TRUE, 
                    Messages.GET_ALL_IDEAS_SUCCESS,
                    ideas,
                    StatusCodes.OK))
                .send();
            return; 
                 
        } catch (error) {

            //this.logger.writeLog(LogTypes.EXCEPTION, 'Set new Character', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ApiResponseDto(
                    Constants.SUCCESS_FALSE, 
                    Messages.GET_ALL_IDEAS_FAILED,
                    [],
                    StatusCodes.INTERNAL_SERVER_ERROR))
                .send(); 
            return;   
        }
    }

    @Get('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all ideas' })
    @ApiResponse({
        status: StatusCodes.OK,
        description: 'Ok, Get all ideas',
        schema: {
            example: 
            {
                "success": "True",
                "message": "Get the requested idea",
                "data": {
                    "ideaId": "e0842c1f-e18b-4ee8-b0ed-63dbf610e77d",
                    "title": "Let's go to work !",
                    "descriotion": "Have a great day at work"
                },
                "status": StatusCodes.OK
            }
        }
      })
      @ApiResponse({
        status: StatusCodes.BAD_REQUEST,
        description: 'Ok, Get all ideas',
        schema: {
            example: 
            {
                "message": [
                    "ideaId must be a string",
                    "ideaId must be a UUID"
                ],
                "error": "Bad Request",
                "statusCode": StatusCodes.BAD_REQUEST
            }
        }
      })
    @ApiResponse({ 
        status: StatusCodes.INTERNAL_SERVER_ERROR, 
        description: 'InternalServerError, Oops... something went wrong',
        schema: {
            example: 
            {
                "success": "False",
                "message": "Oops... something went wrong... , we could not get the requested idea, please try again later...",
                "data": {},
                "status": StatusCodes.INTERNAL_SERVER_ERROR
            }
        }
    })
    @HttpCode(StatusCodes.OK)
    async getIdea(@Query() ideaGetRequest: IdeaGetRequestDto, @Res() res: Response): Promise<ApiResponseDto> {

        try {
            const ideaResult: Idea = 
                    await this.ideaService.getIdea(
                                    ideaGetRequest.ideaId);                    

            if (ideaResult == null) {                
                res.status(StatusCodes.BAD_REQUEST)
                    .json(
                        new ApiResponseDto(
                            Constants.SUCCESS_FALSE, 
                            Messages.GET_IDEA_NOT_FOUND,
                            {},
                            StatusCodes.BAD_REQUEST))
                    .send();  
                    return;                  
            } 
            
            const ideaResponseDto: IdeaResponseDto = 
                        new IdeaResponseDto(
                            ideaResult.ideaId,
                            ideaResult.title,
                            ideaResult.description
                        );

            //this.logger.writeLog(LogTypes.INFO, 'Set new Character', 'New Character inserted');
            res.status(StatusCodes.OK)
                .json(new ApiResponseDto(
                    Constants.SUCCESS_TRUE, 
                    Messages.GET_ALL_IDEA_SUCCESS,
                    ideaResponseDto,
                    StatusCodes.OK))
                .send();     
            return;
        } catch (error) {

            //this.logger.writeLog(LogTypes.EXCEPTION, 'Set new Character', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ApiResponseDto(
                    Constants.SUCCESS_FALSE, 
                    Messages.GET_ALL_IDEA_FAILED,
                    {},
                    StatusCodes.INTERNAL_SERVER_ERROR))
                .send();     
            return;
        }
    }

    @Put('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all ideas' })
    @ApiResponse({
        status: StatusCodes.OK,
        description: 'Ok, Get all ideas',
        schema: {
            example: 
            {
                "success": "True",
                "message": "Your requested idea updated successfully",
                "data": {
                    "ideaId": "e0842c1f-e18b-4ee8-b0ed-63dbf610e77d",
                    "title": "Let's go to work !",
                    "descriotion": "Have a great day and night at work"
                },
                "status": StatusCodes.OK
            }
        }
      })
      @ApiResponse({
        status: StatusCodes.BAD_REQUEST,
        description: 'Ok, Get all ideas',
        schema: {
            example: 
            {
                "message": [
                    "ideaId should not be null or undefined",
                    "ideaId must be longer than or equal to 10 characters",
                    "ideaId must be shorter than or equal to 50 characters",
                    "ideaId must be a string",
                    "ideaId must be a UUID",
                    "title should not be null or undefined",
                    "title must be longer than or equal to 10 characters",
                    "title must be shorter than or equal to 50 characters",
                    "title must be a string",
                    "title must contain only letters (a-zA-Z)",
                    "description must be longer than or equal to 20 characters",
                    "description must be shorter than or equal to 150 characters",
                    "description must be a string"
                ],
                "error": "Bad Request",
                "statusCode": StatusCodes.BAD_REQUEST
            }
        }
      })
    @ApiResponse({ 
        status: StatusCodes.INTERNAL_SERVER_ERROR, 
        description: 'InternalServerError, Oops... something went wrong',
        schema: {
            example: 
            {
                "success": "False",
                "message": "Oops... something went wrong... , we could not get the requested idea, please try to update idea again later...",
                "data": {},
                "status": StatusCodes.INTERNAL_SERVER_ERROR
            }
        }
    })
    @HttpCode(StatusCodes.OK)
    async updateIdea(@Body() ideaPutRequest: IdeaPutRequestDto, @Res() res: Response): Promise<ApiResponseDto> {

        try {

            const ideaResult: Idea = 
                    await this.ideaService.updateIdea(
                                ideaPutRequest.ideaId,
                                ideaPutRequest.title, 
                                ideaPutRequest.description);

            if (ideaResult == null) {                
                res.status(StatusCodes.BAD_REQUEST)
                    .json(
                        new ApiResponseDto(
                            Constants.SUCCESS_FALSE, 
                            Messages.GET_IDEA_UPDATE_NOT_FOUND,
                            {},
                            StatusCodes.BAD_REQUEST))
                    .send();  
                    return;                  
            } 
            
            const ideaResponseDto: IdeaResponseDto = 
                        new IdeaResponseDto(
                            ideaResult.ideaId,
                            ideaResult.title,
                            ideaResult.description
                        );                    

            //this.logger.writeLog(LogTypes.INFO, 'Set new Character', 'New Character inserted');
            res.status(StatusCodes.OK)
                .json(new ApiResponseDto(
                    Constants.SUCCESS_TRUE, 
                    Messages.IDEA_UPDATED_SUCCESS,
                    ideaResponseDto,
                    StatusCodes.OK))
                .send();     
            return;

        } catch (error) {

            //this.logger.writeLog(LogTypes.EXCEPTION, 'Set new Character', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ApiResponseDto(
                    Constants.SUCCESS_FALSE, 
                    Messages.IDEA_UPDATED_FAILED,
                    {},
                    StatusCodes.INTERNAL_SERVER_ERROR))
                .send();
                return;     
        }
    }

    @Delete('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all ideas' })
    @ApiResponse({
        status: StatusCodes.OK,
        description: 'Ok, Get all ideas',
        schema: {
            example: 
            {
                "success": "True",
                "message": "Your requested idea deleted successfully",
                "data": {
                    "id": "e6bfaf08-e0f1-450d-bea2-89b8b1c23fb0"
                },
                "status": StatusCodes.OK
            }
        }
      })
      @ApiResponse({
        status: StatusCodes.BAD_REQUEST,
        description: 'Ok, Get all ideas',
        schema: {
            example: 
            {
                "message": [
                    "ideaId must be a string",
                    "ideaId must be a UUID"
                ],
                "error": "Bad Request",
                "statusCode": StatusCodes.BAD_REQUEST
            }
        }
      })
    @ApiResponse({ 
        status: StatusCodes.INTERNAL_SERVER_ERROR, 
        description: 'InternalServerError, Oops... something went wrong',
        schema: {
            example: 
            {
                "success": "False",
                "message": "Oops... something went wrong... , we could not get the requested idea, please try to update idea again later...",
                "data": {},
                "status": StatusCodes.INTERNAL_SERVER_ERROR
            }
        }
    })
    @HttpCode(StatusCodes.OK)
    async deleteIdea(@Query() ideaGetRequest: IdeaGetRequestDto, @Res() res: Response): Promise<ApiResponseDto> {

        try {

            const ideaResult: Idea = 
                    await this.ideaService.deleteIdea(
                                ideaGetRequest.ideaId);

            if (ideaResult == null) {                
                res.status(StatusCodes.BAD_REQUEST)
                    .json(
                        new ApiResponseDto(
                            Constants.SUCCESS_FALSE, 
                            Messages.GET_IDEA_FOR_DELETE_NOT_FOUND,
                            {},
                            StatusCodes.BAD_REQUEST))
                    .send();  
                    return;                  
            }   
            const id: string = ideaResult.ideaId;                  

            //this.logger.writeLog(LogTypes.INFO, 'Set new Character', 'New Character inserted');
            res.status(StatusCodes.OK)
                .json(new ApiResponseDto(
                    Constants.SUCCESS_TRUE, 
                    Messages.IDEA_DELETED_SUCCESS,
                    { id },
                    StatusCodes.OK))
                .send();     
                return;
        } catch (error) {

            //this.logger.writeLog(LogTypes.EXCEPTION, 'Set new Character', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ApiResponseDto(
                    Constants.SUCCESS_FALSE, 
                    Messages.INSERT_NEW_IDEA_FAILED,
                    {},
                    StatusCodes.INTERNAL_SERVER_ERROR))
                .send();     
                return;
        }
    }
} 