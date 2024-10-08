
import { Test } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CharacterRequestDto } from './dto/character.model';
import { Constants } from '../main/const/constants.model';
import { uuid as uuidv4 } from 'uuidv4';
import { LoggerService } from '../main/logs/logger.service';

describe('CharacterController', () => {
  let characterController: CharacterController;
  let characterService: CharacterService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CharacterController],
        providers: [CharacterService, LoggerService, { provide: Constants.CACHE_MANAGER, useValue: {} }],
      }).compile();

    characterService = moduleRef.get<CharacterService>(CharacterService);
    characterController = moduleRef.get<CharacterController>(CharacterController);
  });

  describe('CharacterController', () => {
    it('Method should be defined', async () => {

        const generatedUserId = uuidv4();

        const input: CharacterRequestDto = {
            userId: generatedUserId,
            character: 'a'
        };

        const serviceResult: Promise<void> = null;

        jest.spyOn(characterService, 'insertCharacter').mockImplementation(() => serviceResult);

        console.log('CharacterController: ', 'insertCharacter() method should be defined');

        expect(await characterController.insertCharacter(input)).toBeDefined();
    });
  });
});
