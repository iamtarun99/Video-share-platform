import { Test, TestingModule } from '@nestjs/testing';
import { VidAuthController } from './vid-auth.controller';
import { VidAuthService } from './vid-auth.service';
import { JwtModule } from '@nestjs/jwt';

describe('VidAuthController', () => {
  let vidAuthController: VidAuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [VidAuthController],
      providers: [VidAuthService, { provide: 'USER_SERVICE', useValue: { send: () => undefined}}],
    }).compile();

    vidAuthController = app.get<VidAuthController>(VidAuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(vidAuthController.getHello()).toBe('Hello World!');
    });
  });
});
