import { Test, TestingModule } from '@nestjs/testing';
import { VidUserGqlResolver } from './vid-user-gql.resolver';
import { VidUserGqlService } from './vid-user-gql.service';
import { getModelToken } from '@nestjs/mongoose';

describe('VidUserGqlResolver', () => {
  let vidUserGqlResolver: VidUserGqlResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [VidUserGqlResolver, VidUserGqlService, {provide: getModelToken('User'), useValue: []}],
    }).compile();
    vidUserGqlResolver = app.get<VidUserGqlResolver>(VidUserGqlResolver);

  });

  describe('Vid user gql', () => {
    it('should define', () => {
      expect(vidUserGqlResolver).toBeDefined();
    });
  });
});
