import { Test, TestingModule } from '@nestjs/testing';
import { VidAuthController } from './vid-auth.controller';
import { VidAuthService } from './vid-auth.service';

describe('VidAuthController', () => {
  let vidAuthController: VidAuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VidAuthController],
      providers: [VidAuthService],
    }).compile();

    vidAuthController = app.get<VidAuthController>(VidAuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(vidAuthController.getHello()).toBe('Hello World!');
    });
  });
});
