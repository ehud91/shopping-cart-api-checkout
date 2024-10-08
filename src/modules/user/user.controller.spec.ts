
import { Test } from '@nestjs/testing';
import { UserController } from './user.contoller';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/user.model';
import { UserStoreDto } from './dto/userstore.model';
import { Constants } from '../main/const/constants.model';
import { uuid as uuidv4 } from 'uuidv4';
import { LoggerService } from '../main/logs/logger.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [UserController],
        providers: [UserService, LoggerService, { provide: Constants.CACHE_MANAGER, useValue: {} }],
      }).compile();

      userService = moduleRef.get<UserService>(UserService);
      userController = moduleRef.get<UserController>(UserController);
  });

  describe('UserController', () => {
    it('Method should be defined', async () => {

        const generatedUserId = uuidv4();

        const input: UserRequestDto = {
            userId: generatedUserId,
        };

        const serviceResult: Promise<UserStoreDto> = null;

        //jest.spyOn(userService, 'getUser').mockImplementation(() => serviceResult);

        console.log('userController: ', 'getUser() method should be defined');

        expect(await userController.getUser(input)).toBeDefined();
    });
  });
});
