import { Test, TestingModule } from '@nestjs/testing';
import { VidUserController } from './vid-user.controller';
import { VidUserService } from './vid-user.service';
import { getModelToken } from '@nestjs/mongoose';

describe('VidUserController', () => {
  let vidUserController: VidUserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VidUserController],
      providers: [VidUserService, {provide: getModelToken('User'), useValue: []}],
    }).compile();

    vidUserController = app.get<VidUserController>(VidUserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(vidUserController.getHello()).toBe('Hello World!');
    });
  });
});
