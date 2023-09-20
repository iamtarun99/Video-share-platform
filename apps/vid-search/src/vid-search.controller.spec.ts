import { Test, TestingModule } from '@nestjs/testing';
import { VidSearchController } from './vid-search.controller';
import { VidSearchService } from './vid-search.service';
import { getModelToken } from '@nestjs/mongoose';

describe('VidSearchController', () => {
  let vidSearchController: VidSearchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VidSearchController],
      providers: [VidSearchService, {provide: getModelToken('Video'), useValue: []}],
    }).compile();

    vidSearchController = app.get<VidSearchController>(VidSearchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(vidSearchController.getHello()).toBe('Hello World!');
    });
  });
});
