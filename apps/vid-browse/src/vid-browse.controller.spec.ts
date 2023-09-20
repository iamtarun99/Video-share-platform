import { Test, TestingModule } from '@nestjs/testing';
import { VidBrowseController } from './vid-browse.controller';
import { VidBrowseService } from './vid-browse.service';
import { getModelToken } from '@nestjs/mongoose';

describe('VidBrowseController', () => {
  let vidBrowseController: VidBrowseController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [VidBrowseController],
      providers: [VidBrowseService, {provide: getModelToken('Video'), useValue: []}],
    }).compile();

    vidBrowseController = app.get<VidBrowseController>(VidBrowseController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(vidBrowseController.getHello()).toBe('Hello World!');
    });
  });
});
