import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { Constants } from '../main/const/constants.model';
import { uuid as uuidv4 } from 'uuidv4';
import { ConstantsCharacter } from './const/constants.model';
import { CharacterStoreDto } from './dto/characterstore.model';
import { LoggerService } from '../main/logs/logger.service';
import config from '../main/config/config';

describe('CharacterService', () => {

    let characterService: CharacterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CharacterService, LoggerService, { provide: Constants.CACHE_MANAGER, useValue: {} }]
        }).compile();

        characterService = module.get<CharacterService>(CharacterService);
    });

    describe('CharacterService', () => {
        it('Service should be defined', () => {
            console.log('CharacterService ', 'Service should be defined... ');
            expect(characterService).toBeDefined();
        });

        it('Should insert new character', async () => {

            const generatedUserId = uuidv4();

            const input = {
                userId: generatedUserId,
                character: 'a'
            }
            const result: CharacterStoreDto = { 
                userId: generatedUserId, 
                character: 'a', 
                number: -1 
            };
    
            jest.spyOn(characterService, 'insertNewCharacter').mockResolvedValue(result); // Use mockResolvedValue for async methods

            console.log('CharacterService: ', 'Should insert new character');
            console.log('Input: ', input);
            console.log('Result: ', result);
            await expect(characterService.insertNewCharacter(input.character, input.character)).resolves.toEqual(result);
            
        });

        it('Should get the requested character by user id (key)', async () => {
            
            const generatedUserId = uuidv4();

            const input = {
                key: ConstantsCharacter.REDIS_KEY_CHAR + generatedUserId
            }

            const result: CharacterStoreDto = { 
                userId: generatedUserId, 
                character: 'a', 
                number: -1 
            };

            jest.spyOn(characterService, 'getCharacter').mockResolvedValue(result); // Use mockResolvedValue for async methods

            console.log('CharacterService: ', 'Should get the requested character');
            console.log('Input: ', input);
            console.log('Result: ', result);

            await expect(characterService.getCharacter(input.key)).resolves.toEqual(result);
            
        });


        it('Should update the given character by user id (key)', async () => {

            const generatedUserId = uuidv4();

            const inputData: CharacterStoreDto = {
                userId: generatedUserId,
                character: 'a',
                number: -1
            }

            const input = {
                key: ConstantsCharacter.REDIS_KEY_CHAR + generatedUserId,
                data: inputData,
                ttl: config().redis.cache_ttl
            }

            const result: void = null;

            jest.spyOn(characterService, 'updateCharacter').mockResolvedValue(result); // Use mockResolvedValue for async methods

            console.log('CharacterService: ', 'Should update the given character by user id (key)');
            console.log('Input: ', input);
            console.log('Result: ', result);

            await expect(characterService.updateCharacter(input.key, input.data, input.ttl)).resolves.toEqual(result);
        });

        it('Should insert a new character with a given user id (key)', async () => {

            const generatedUserId = uuidv4();

            const inputData: CharacterStoreDto = {
                userId: generatedUserId,
                character: 'a',
                number: -1
            }

            const input = {
                key: ConstantsCharacter.REDIS_KEY_CHAR + generatedUserId,
                data: inputData,
                ttl: config().redis.cache_ttl
            }

            const result: void = null;

            jest.spyOn(characterService, 'insertCharacter').mockResolvedValue(result); // Use mockResolvedValue for async methods

            console.log('CharacterService: ', 'Should insert a new character with a given user id (key)');
            console.log('Input: ', input);
            console.log('Result: ', result);

            await expect(characterService.insertCharacter(input.key, input.data, input.ttl)).resolves.toEqual(result);
            
        });
    });
});
