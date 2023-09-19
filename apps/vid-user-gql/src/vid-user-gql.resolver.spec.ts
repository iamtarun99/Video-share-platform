import { Test, TestingModule } from '@nestjs/testing';
import { VidUserGqlController } from './vid-user-gql.resolver';
import { VidUserGqlService } from './vid-user-gql.service';

describe('VidUserGqlController', () => {
  let vidUserGqlController: VidUserGqlController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VidUserGqlController],
      providers: [VidUserGqlService],
    }).compile();

    vidUserGqlController = app.get<VidUserGqlController>(VidUserGqlController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(vidUserGqlController.getHello()).toBe('Hello World!');
    });
  });
});
