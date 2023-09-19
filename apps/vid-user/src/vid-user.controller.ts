import { Controller, Get } from '@nestjs/common';
import { VidUserService } from './vid-user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './dtos/vid-user.dto';

@Controller()
export class VidUserController {
  constructor(private readonly vidUserService: VidUserService) {}

  @Get()
  getHello(): string {
    return this.vidUserService.getHello();
  }

  @MessagePattern('profile')
  async getProfile(user: any): Promise<User> {
    return this.vidUserService.getProfile(user);
  }

  @MessagePattern('validate-user')
  async validateUser(user: any): Promise<Partial<User>> {
    return this.vidUserService.validateUser(user);
  }
}