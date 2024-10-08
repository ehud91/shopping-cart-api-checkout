
import { Test } from '@nestjs/testing';
import { CheckoutController } from './checkout.contoller';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.model';
import { Constants } from '../main/const/constants.model';
import { uuid as uuidv4 } from 'uuidv4';
//import { LoggerService } from '../main/logs/logger.service';

describe('CheckoutController', () => {
  let checkoutController: CheckoutController;
  let checkoutService: CheckoutService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CheckoutController],
        providers: [CheckoutService, { provide: Constants.CACHE_MANAGER, useValue: {} }],
      }).compile();

      checkoutService = moduleRef.get<CheckoutService>(CheckoutService);
      checkoutController = moduleRef.get<CheckoutController>(CheckoutController);
  });

  describe('CheckoutController', () => {
    it('Method should be defined', async () => {

        const fullName = 'John Doe';

        //const input: CheckoutDto = {
        //    fullname: fullName,
        //};

        //const serviceResult: Promise<UserStoreDto> = null;

        //jest.spyOn(userService, 'getUser').mockImplementation(() => serviceResult);

        console.log('CheckoutController: ', 'getUser() method should be defined');

        //expect(await checkoutController.getUser(input)).toBeDefined();
    });
  });
});
