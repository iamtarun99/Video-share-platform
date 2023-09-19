import { User } from './dtos/vid-user.dto';
import { VidUserGqlService } from './vid-user-gql.service';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class VidUserGqlResolver {
  constructor(private readonly vidUserGqlService: VidUserGqlService) {}

  @Query('users')
  async getUsers(): Promise<User[]> {
    return this.vidUserGqlService.findAll();
  }

  @Query('user')
  async getUser(@Args('userId', { type: () => String }) userId: string): Promise<User> {
    return this.vidUserGqlService.findById(userId);
  }
}
