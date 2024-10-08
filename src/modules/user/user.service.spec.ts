import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Constants } from '../main/const/constants.model';
import { uuid as uuidv4 } from 'uuidv4';
import { ConstantsUser } from './const/constants.model';
import { UserStoreDto } from './dto/userstore.model';
import { UserResponseDto } from './dto/userresponse.mode';
import { LoggerService } from '../main/logs/logger.service';
import config from '../main/config/config';

describe('UserService', () => {

    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, LoggerService, { provide: Constants.CACHE_MANAGER, useValue: {} }]
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    describe('UserService', () => {
        it('Service should be defined', () => {
            console.log('CharacterService ', 'Service should be defined... ');
            expect(userService).toBeDefined();
        });

        it('Should get the requested user by user id (key)', async () => {
            
            const generatedUserId = uuidv4();

            const input = {
                key: ConstantsUser.REDIS_KEY_USER + generatedUserId
            }

            const result: UserStoreDto = { 
                userId: generatedUserId, 
                character: 'a', 
                number: -1 
            };

            jest.spyOn(userService, 'getUser').mockResolvedValue(result); // Use mockResolvedValue for async methods

            console.log('NumberService: ', 'Should get the requested number');
            console.log('Input: ', input);
            console.log('Result: ', result);

            await expect(userService.getUser(input.key)).resolves.toEqual(result);
            
        });


        it('Should checo for the given user id (key) if has both character and number (Boolean)', async () => {

            const generatedUserId = uuidv4();

            const inputData: UserStoreDto = {
                userId: generatedUserId,
                character: 'a',
                number: 2
            }

            const input = {
                key: ConstantsUser.REDIS_KEY_USER + generatedUserId,
                data: inputData,
                ttl: config().redis.cache_ttl
            }

            const result: boolean = true;

            jest.spyOn(userService, 'userHasCharacterAndNumber').mockResolvedValue(result); // Use mockResolvedValue for async methods

            console.log('NumberService: ', 'Should checo for the given user id (key) if has both character and number (Boolean)');
            console.log('Input: ', input);
            console.log('Result: ', result);

            await expect(userService.userHasCharacterAndNumber(inputData)).resolves.toEqual(result);
        });

        it('Should concatinate the character and number for the given user id (key)', async () => {

            const generatedUserId = uuidv4();

            const inputData: UserStoreDto = {
                userId: generatedUserId,
                character: 'a',
                number: -1
            }

            const input = {
                key: ConstantsUser.REDIS_KEY_USER + generatedUserId,
                data: inputData,
                ttl: config().redis.cache_ttl
            }

            const result: UserResponseDto = {
                result: 'a_1'
            };

            jest.spyOn(userService, 'getUserCharacterAndNumber').mockResolvedValue(result); // Use mockResolvedValue for async methods

            console.log('NumberService: ', 'Should concatinate the character and number for the given user id (key)');
            console.log('Input: ', input);
            console.log('Result: ', result);

            await expect(userService.getUserCharacterAndNumber(inputData)).resolves.toEqual(result);
            
        });

        it('Should insert a new number with a given user id (key)', async () => {

            const generatedUserId = uuidv4();

            const input = {
                key: ConstantsUser.REDIS_KEY_USER + generatedUserId,
            }

            const result: UserStoreDto = {
                userId: generatedUserId,
                character: 'a',
                number: -1
            };

            jest.spyOn(userService, 'findUser').mockResolvedValue(result); // Use mockResolvedValue for async methods

            console.log('NumberService: ', 'Should find the requested user by a given user id (key)');
            console.log('Input: ', input);
            console.log('Result: ', result);

            await expect(userService.findUser(input.key)).resolves.toEqual(result);
            
        });
    });
});
